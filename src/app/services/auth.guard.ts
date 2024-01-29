import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const rout = inject(Router);
  if(auth.isLoggedInGuard){
    return true;
  }else{
    rout.navigate(['/login']);
    return false;
  }
  
};
