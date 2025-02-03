import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // Initialize Firebase with your configuration
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // Set up Firestore
    provideFirestore(() => getFirestore()),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
