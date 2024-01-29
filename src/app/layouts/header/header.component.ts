import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user_email: string ='';
  isLoggedIn$!:Observable<boolean> ;
  
  constructor(private auth:AuthService,private router:Router) {}

  ngOnInit() {
    const user = localStorage.getItem('User');
    if (user) {
      // console.log(JSON.parse(user).email);
      this.isLoggedIn$ =  this.auth.isLoggedIn();
      console.log(this.isLoggedIn$);
      this.user_email = JSON.parse(user).email;
     console.log('Hi i m inside the user data.');
     
     
    } else {
      console.log('No user is there');
    }
  }

 async logout(){
   await this.auth.SignOut();
  
  //  this.user_email='';
  }
}
