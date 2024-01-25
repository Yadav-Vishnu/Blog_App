import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { AllPostComponent } from './post/all-post/all-post.component';

export const routes: Routes = [
    {
        path:'',
        component:DashboardComponent
    },
    {
        path:'categories',
        component:CategoriesComponent
    },
    {
        path:'posts',
        component:AllPostComponent
    },
    
    {
        path:'posts/new',
        component:NewPostComponent
    }
];
