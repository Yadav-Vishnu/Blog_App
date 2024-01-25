import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Post } from '../modules/post';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private storage: Storage = inject(Storage);
  // private firestore!: Firestore ;
   firestore: Firestore = inject(Firestore);
  constructor() { }

  async uploadImag(selected_img: File,postData:Post) {
    const filePath = `postIMG/${Date.now()}_${selected_img.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, selected_img);

    // Monitor the upload task
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Get the upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.error('Upload failed:', error);
      }
    );

    // Handle successful uploads on complete
    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      postData.postImgPath = downloadURL;
      
      // console.log(postData);
    } catch (error) {
      console.error('Upload failed:', error);
    }

      this.saveData(postData)
    // try {
    //   const docRef = await addDoc(collection(this.firestore, 'post'), postData);
    //   console.log('New category added with ID: ', docRef.id);
      
    // } catch (e) {
    //   console.error('Error adding document: ', e);
    // }

   
  }

  async saveData(postData:Post){
    try {
      console.log("HI kaustubh",this.firestore);
      const docRef = await addDoc(collection(this.firestore, 'post'), postData);
      console.log('New category added with ID: ', docRef.id);
      
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}
