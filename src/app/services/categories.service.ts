import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc , query, getDocs, doc, updateDoc, deleteDoc} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  firestore: Firestore = inject(Firestore);
  
  constructor() { }

 async saveData(categoryData:any){
    try {
      const docRef = await addDoc(collection(this.firestore, 'categories'), categoryData);
      console.log('New category added with ID: ', docRef.id);
      // formData.reset();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }


  async loadData(){
    const q = query(collection(this.firestore, 'categories'));
    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    return categories;
  }

  async updateData(id: string, Edit_data: any) {
    try {
      const docRef = doc(this.firestore, 'categories', id);
      await updateDoc(docRef, Edit_data);
      console.log('Category updated with ID: ', id);
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }

  async deleteData(id: string) {
    try {
      const docRef = doc(this.firestore, 'categories', id);
      await deleteDoc(docRef);
      console.log('Category deleted with ID: ', id);
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  }
  
}
