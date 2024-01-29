import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { LoginComponent } from './Auth/login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path:'',
        component:DashboardComponent,
        canActivate:[authGuard]
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'categories',
        component:CategoriesComponent,
        canActivate:[authGuard]
    },
    {
        path:'posts',
        component:AllPostComponent,
        canActivate:[authGuard]
    },
    
    {
        path:'posts/new',
        component:NewPostComponent,
        canActivate:[authGuard]
    }
];
