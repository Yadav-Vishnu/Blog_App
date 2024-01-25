import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'blog-2de98',
          appId: '1:1015353196125:web:a51e1978cb17e401f097b4',
          storageBucket: 'blog-2de98.appspot.com',
          apiKey: 'AIzaSyAdT34h_JlEJPTAAGlVcVqv2g-X9kmwgsg',
          authDomain: 'blog-2de98.firebaseapp.com',
          messagingSenderId: '1015353196125',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
