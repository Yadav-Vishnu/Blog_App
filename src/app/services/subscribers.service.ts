import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  firestore: Firestore = inject(Firestore);
  constructor() { }

  async loadData() {
    const q = query(collection(this.firestore, 'subscribers'));
    const querySnapshot = await getDocs(q);
    const post = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return post;
  }

  async delete_post(id:string){
    try {
      const docRef = doc(this.firestore, 'subscribers', id);
     
      await deleteDoc(docRef);
      
     
      // console.log('Category deleted with ID: ', id);
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  }
}
