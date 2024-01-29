import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedInGuard:boolean=false;
  loggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private auth: Auth = getAuth(),private router:Router) { }

  // Sign in with email/password
 async SignIn(email: string, password: string) {
    // this.loggedIn.next(true);
    try {
      const data = await signInWithEmailAndPassword(this.auth, email, password);
      this.loggedIn.next(true);
      this.isLoggedInGuard =true;
      return data;

    } catch (error) {
      console.log('Error is occured ',error);
      return ;
    }

  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Sign out
  SignOut() {
    localStorage.removeItem('User');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    this.isLoggedInGuard =false;
    return signOut(this.auth);
    
  }

  loadUser() {
    const user = this.auth.currentUser;
    if (user) {
      // User is signed in, return the user data
      // localStorage.setItem('User',JSON.parse(JSON.stringify(user)));
      localStorage.setItem('User',JSON.stringify(user));
      return user;
    } else {
      // No user is signed in
      return null;
    }
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
  
}
