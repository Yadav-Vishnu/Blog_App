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
     
    this.load_data();
    
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
  
}
