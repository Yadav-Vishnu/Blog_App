import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { initializeApp } from "firebase/app";
import {environment } from '../environments/environment.development';
// import { Firestore} from '@angular/fire/firestore';
import {CategoriesComponent} from './categories/categories.component';
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,DashboardComponent,CategoriesComponent, FooterComponent,RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ang-blog-dashboard';
  app = initializeApp(environment.firebaseConfig);
}
