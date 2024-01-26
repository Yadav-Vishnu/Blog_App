import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent {
  loaded_post!:Array<any>;
  constructor(public Post_services:PostService){
     
    this.load_data().then(()=>{
      return ;
    });
    
  }

  async load_data(){
      try {
          this.loaded_post = await this.Post_services.loadData();
          // console.log(this.loaded_post);
          
      } catch (error) {
        
        console.log('data is not loaded',error);
        
        
      }
  }

  async onDelete(path: string, id: string) {
    try {
      await this.Post_services.delete_img(path, id);
      await this.load_data();
    } catch (error) {
      console.error('Error deleting image: ', error);
    }
  }

 async is_Featured(id:string,status:boolean){
    const post_data = await  this.Post_services.one_data(id);
    // console.log(post_data);
    if(post_data.data){
      post_data.data['isFeatured'] = status;
      await this.Post_services.update_Data(id,post_data.data);
    }
    await this.load_data();
   
    
  }
  
}
