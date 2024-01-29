import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import{AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth_service:AuthService,private router:Router){}
 async onSubmit(Form_val:any){
    // console.log(Form_val);
   try {
    const response = await this.auth_service.SignIn(Form_val.Email,Form_val.password);
    // this.auth_service.loggedIn.next(true); 
    const user_data = this.auth_service.loadUser();
    this.router.navigate(['/']); 
    // console.log(JSON.parse(JSON.stringify(user_data)));
    // console.log(JSON.parse(JSON.stringify(user_data)));
    
   } catch (error) {
      console.log('Error is occured ',error);
      
   }
    // console.log(response);
    
  }
}
