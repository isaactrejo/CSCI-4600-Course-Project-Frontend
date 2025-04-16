import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],
  template: `
  <section>
    <!-- <div class="d-flex w-50 justify-content-center align-items-center vh-100">
      <div class="card-body px-4 py-5 px-md-5">
        <div class="card bg-danger">
          <div class="card-body px-4 py-5 px-md-5">
            <form>
            
              <div class="row">

                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="username" id="formSignIn" class="form-control" />
                  <label class="form-label" for="formSignIn">Username</label>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" id="formSignIn" class="form-control" />
                  <label class="form-label" for="formSignIn">Password</label>
                </div>
                
                </div>
            </form>
          </div>
        </div>
      </div>
    </div> -->
    <!-- autocomplete="off" -->
    <div class="vh-100 w-100 bg-dark form-signin-container d-flex align-items-center justify-content-center" data-bs-theme="dark">
      <div class="col-lg-4 text-center mb-3">
        <div class="card dark-card p-4 my-3">
          <main class="form-signin w-100 m-auto text-light">
            <form [formGroup]="authForm" (ngSubmit)="onSubmit()" ngNativeValidate>
              <img class="mb-4" src="https://1000logos.net/wp-content/uploads/2019/09/Austin-Peay-Governors-Logo-1976.png" alt="Logo" width="100" height="57">
              <h1 *ngIf="isSigningIn" class="h3 mb-3 fw-normal">Please sign in</h1>
              <h1 *ngIf="!isSigningIn" class="h3 mb-3 fw-normal">Create an account</h1>
              
              <!-- Only show these fields when signing up -->
              <div *ngIf="!isSigningIn">
                <div class="form-floating mt-3 position-relative">
                  <input formControlName="firstname" type="text" class="form-control" id="floatingFirstName" placeholder="First Name" required>
                  <label for="floatingFirstName">First Name</label>
                </div>
                <div class="form-floating mt-3 position-relative">
                  <input formControlName="lastname" type="text" class="form-control" id="floatingLastName" placeholder="Last Name" required>
                  <label for="floatingLastName">Last Name</label>
                </div>
                <div class="mt-3">
                  <label class="form-label">I am a:</label>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="userType" id="studentRadio" value="student" formControlName="userType">
                    <label class="form-check-label" for="studentRadio">Student</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="userType" id="teacherRadio" value="teacher" formControlName="userType">
                    <label class="form-check-label" for="teacherRadio">Teacher</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="userType" id="adminRadio" value="admin" formControlName="userType">
                    <label class="form-check-label" for="adminRadio">Admin</label>
                  </div>
                </div>
              </div>
              
              <!-- Always ask for email and password -->
              <div class="form-floating mt-3 position-relative">
                <input formControlName="email" type="email" class="form-control" id="floatingInput" placeholder="Email" required>
                <label for="floatingInput">Email</label>
              </div>
              <div class="form-floating mt-3 position-relative">
                <input formControlName="password" [type]="passwordFieldType" class="form-control" id="floatingPassword" placeholder="Password" required>
                <label for="floatingPassword">Password</label>
                <i class="bi" [ngClass]="passwordIcon" (click)="togglePassword()" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;"></i>
              </div>
              <small *ngIf="isSigningIn" class="d-block mt-2">Don't have an account? <a class="signinlink" (click)="goToSignUp()">Sign Up</a></small>
              <small *ngIf="!isSigningIn" class="d-block mt-2">Already have an account? <a class="signinlink" (click)="goToSignUp()">Sign In</a></small>
              
              <div *ngIf="isSigningIn" class="form-check text-start my-3">
                <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Remember me
                </label>
              </div>
              <button *ngIf="isSigningIn" class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
              <button *ngIf="!isSigningIn" class="btn btn-primary w-100 py-2" type="submit">Sign up</button>
              <p class="mt-5 mb-3 text-body-secondary">© Team5 2025</p>
            </form>
          </main>
        </div>
      </div>
    </div>
  </section>
    
  `,
  styleUrl: './login-page.component.scss',
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0}),
        animate('300ms ease-in', style({ hegiht: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})

export class LoginPageComponent {

  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  formBuilder: FormBuilder = inject(FormBuilder);

  passwordFieldType: string = 'password';
  passwordIcon: string = 'bi-eye-slash';

  isSigningIn: boolean = true;

  authForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  
  goToSignUp() {
    
    /**
      sudo coding to visualize  

      boolean isSingingIn = true;
      
      if(isSinging true) {isSingingture fasle}
      else if (isSinging false) {iSing true}


     */
    
      if(this.isSigningIn == true) {
        this.isSigningIn = false;
      } else if(this.isSigningIn == false) {
        this.isSigningIn = true;
      }
  }

  togglePassword() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIcon = 'bi-eye';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIcon = 'bi-eye-slash';
    }
  }

  /** 
  onSubmit() {
    
    if (this.authForm.valid) {
      if(this.isSigningIn == true) {
        this.authService.signIn(this.authForm.value.email, this.authForm.value.password);
      } else if(this.isSigningIn == false) {
        this.authService.signUp(this.authForm.value.email, this.authForm.value.password);
      }
    } else {
      // show an error
    }
  }
    */

  onSubmit() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
  
      if (this.isSigningIn) {
        this.authService.signIn(email, password)
          .then((userCredential) => {
            console.log("Logged in:", userCredential.user);
            this.router.navigate(['/dashboard']); // change to your actual route
          })
          .catch((err) => {
            console.error("Login error:", err.message);
            // show error message to user
          });
      } else {
        this.authService.signUp(email, password)
          .then((userCredential) => {
            console.log("Signed up:", userCredential.user);
            this.router.navigate(['/dashboard']); // change to your actual route
          })
          .catch((err) => {
            console.error("Signup error:", err.message);
            // show error message to user
          });
      }
    } else {
      console.warn("Form is invalid");
      // display validation errors
    }
  }
  
}