import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB0tWiRcOP8vvDxI1ufUVQab00kWdN_CIo',
  authDomain: 'angular-stockhive.firebaseapp.com',
  projectId: 'angular-stockhive',
  storageBucket: 'angular-stockhive.firebasestorage.app',
  messagingSenderId: '972969428448',
  appId: '1:972969428448:web:e72cd5dbd88d103024d785',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
