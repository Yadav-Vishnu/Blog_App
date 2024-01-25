import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { Post } from '../modules/post';
import {
  Firestore,
  collection,
  addDoc,
  query,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private storage: Storage = inject(Storage);
  // private firestore!: Firestore ;
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  async uploadImag(selected_img: File, postData: Post,form_status:string,I_D:string) {
    const filePath = `postIMG/${Date.now()}_${selected_img.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, selected_img);

    // Monitor the upload task
    // uploadTask.on(
    //   'state_changed',
    //   (snapshot) => {
    //     // Get the upload progress
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //     console.error('Upload failed:', error);
    //   }
    // );

    // Handle successful uploads on complete
    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      postData.postImgPath = downloadURL;

      // console.log(postData);
    } catch (error) {
      console.error('Upload failed:', error);
    }

    if(form_status=='Add new'){

      this.saveData(postData);
      this.router.navigate(['/posts']);
    }else if(form_status=='Edit'){
      this.update_Data(I_D,postData);
      this.router.navigate(['/posts']);
    }
  }

  async saveData(postData: Post) {
    try {
      // console.log("HI kaustubh",this.firestore);
      const docRef = await addDoc(collection(this.firestore, 'post'), postData);
      // console.log('New category added with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }


  async update_Data(id: string, postData: any) {
    try {
      const docRef = doc(this.firestore, 'post', id);
      await updateDoc(docRef, postData);
      // console.log('Document updated with ID: ', id);
    } catch (e) {
      console.error('Error updating document: ', e);
    }
}
  async loadData() {
    const q = query(collection(this.firestore, 'post'));
    const querySnapshot = await getDocs(q);
    const post = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return post;
  }

  async one_data(id: string) {
    try {
      const docRef = doc(this.firestore, 'post', id);
      const docSnap = await getDoc(docRef);
      return { id: docSnap.id, data: docSnap.data() };
    } catch (e) {
      throw new Error('No such document!');
    }
  }
}
