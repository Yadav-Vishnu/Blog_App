import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';


@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css'
})
export class SubscribersComponent {
  subscriber!:Array<any>;
  constructor(private sub_service:SubscribersService ){
    this.load();
  }
  
  async load(){
    const val = await this.sub_service.loadData();
    // console.log(val);
    this.subscriber =val;
    
  }
async onDelete(id:string) {

  await this.sub_service.delete_post(id);
  this.load();
}

}
