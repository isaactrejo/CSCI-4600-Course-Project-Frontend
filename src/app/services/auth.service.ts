import { inject, Inject, Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, Auth } from "firebase/auth";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseConfig = {
    apiKey: "AIzaSyAVpUTR67yqwrEBEJIFI3NdS8wDhCLLhcc",
    authDomain: "unipal-40830.firebaseapp.com",
    projectId: "unipal-40830",
    storageBucket: "unipal-40830.appspot.com",
    messagingSenderId: "284061219943",
    appId: "1:284061219943:web:64c5772ab12f086bfee8c2",
    measurementId: "G-XKY74M6XRV"
  };

  app: FirebaseApp;
  auth: Auth;
  
  
  private authStateSubject = new BehaviorSubject<boolean | null>(null);
  authState$ = this.authStateSubject.asObservable();
  private router = inject(Router);
  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth();

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, perform actions like redirecting to the app's main screen
        const uid = user.uid;
        console.log("User is signed in with UID:", uid);
        this.authStateSubject.next(true);
      } else {
        // User is signed out, perform actions like redirecting to the login page
        console.log("User is signed out");
        this.authStateSubject.next(false);
      }
    });
  }
  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .catch((error) => {
        console.error("SignIn Error:", error.message);
        throw error;
      });
  }
  
  signUp(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .catch((error) => {
        console.error("SignUp Error:", error.message);
        throw error;
      });
  }

  signOut(): void {
    signOut(this.auth)
      .then(() => {
        console.log("Sign-out successful.");
        this.router.navigate(['/'])
      })
      .catch((error) => {
        console.error("Sign-out error:", error.message);
      });
  }

  isLoggedIn(): Observable<boolean> {
    return this.authState$.pipe(
      filter(user => user !== null), // filter out null to wait for result
      take(1),
      map((authState) => {
        console.log(authState)
        return authState == true;
      })
    );
  }
}
