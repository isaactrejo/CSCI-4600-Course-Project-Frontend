import { NgClass, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule, CommonModule],
  template: `
  <section>
    <div class="vh-100 w-100 form-signin-container d-flex align-items-center justify-content-center" style="background-color: #131313;" data-bs-theme="dark">
      <div class="col-lg-4 text-center mb-3">
        <div 
        class="card bg-dark dark-card p-4 my-3"
        style="overflow: hidden;"
        [@formState]="isSigningIn ? 'signin' : 'signup'"
        >
          
          <main class="form-signin w-100 m-auto text-light">
            <form [formGroup]="authForm" (ngSubmit)="onSubmit()" ngNativeValidate>
              <img class="mb-4" src="https://1000logos.net/wp-content/uploads/2019/09/Austin-Peay-Governors-Logo-1976.png" alt="Logo" width="100" height="57">
              
              <h1 *ngIf="isSigningIn" class="h3 mb-3 fw-normal" @expandCollapse>Please sign in</h1>
              <h1 *ngIf="!isSigningIn" class="h3 mb-3 fw-normal" @expandCollapse>Create an account</h1>
              
              <!-- Only show these fields when signing up -->
              <div *ngIf="!isSigningIn" @expandCollapse>
                <div class="form-floating mt-3 position-relative">
                  <input formControlName="firstName" type="text" class="form-control" id="floatingFirstName" placeholder="First Name" required>
                  <label for="floatingFirstName">First Name</label>
                </div>
                <div class="form-floating mt-3 position-relative">
                  <input formControlName="lastName" type="text" class="form-control" id="floatingLastName" placeholder="Last Name" required>
                  <label for="floatingLastName">Last Name</label>
                </div>
                <div class="mt-3">
                  <label class="form-label">I am a:</label>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="type" id="studentRadio" value="student" formControlName="type">
                    <label class="form-check-label" for="studentRadio">Student</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="type" id="teacherRadio" value="teacher" formControlName="type">
                    <label class="form-check-label" for="teacherRadio">Teacher</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="type" id="adminRadio" value="admin" formControlName="type">
                    <label class="form-check-label" for="adminRadio">Admin</label>
                  </div>
                </div>
              </div>
              
              <!-- Always ask for email and password -->
              <div class="form-floating mt-3 position-relative" @expandCollapse>
                <input formControlName="email" type="email" class="form-control" id="floatingInput" placeholder="Email" required>
                <label for="floatingInput">Email</label>
              </div>
              <div class="form-floating mt-3 position-relative" @expandCollapse>
                <input formControlName="password" [type]="passwordFieldType" class="form-control" id="floatingPassword" placeholder="Password" required>
                <label for="floatingPassword">Password</label>
                <i class="bi" [ngClass]="passwordIcon" (click)="togglePassword()" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;"></i>
              </div>
              <small *ngIf="isSigningIn" class="d-block mt-2">Don't have an account? <a class="signinlink" (click)="goToSignUp()">Sign Up</a></small>
              <small *ngIf="!isSigningIn" class="d-block mt-2 py-2">Already have an account? <a class="signinlink" (click)="goToSignUp()">Sign In</a></small>
              
              <div *ngIf="isSigningIn" class="form-check text-start my-3" @expandCollapse>
                <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Remember me
                </label>
              </div>
              <!-- <button *ngIf="isSigningIn" class="btn btn-primary w-100 py-2" type="submit" @expandCollapse>Sign in</button>
              <button *ngIf="!isSigningIn" class="btn btn-primary w-100 py-2" type="submit" @expandCollapse>Sign up</button> -->
              <div class="mt-3">
                <button
                  class="btn btn-primary w-100 py-2"
                  type="submit"
                  [hidden]="!isSigningIn"
                  @expandCollapse
                  >Sign in</button>
                <button
                  class="btn btn-primary w-100 py-2"
                  type="submit"
                  [hidden]="isSigningIn"
                  @expandCollapse
                  >Sign up</button>
              </div> 
              <p class="mt-5 mb-3 text-body-secondary">© Team5 2025</p>
            </form>
          </main>
        </div>
      </div>
    </div>
  </section>
    
  `,
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-in', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})

export class LoginPageComponent {

  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  formBuilder: FormBuilder = inject(FormBuilder);
  userSubscription!: Subscription;

  passwordFieldType: string = 'password';
  passwordIcon: string = 'bi-eye-slash';

  isSigningIn: boolean = true;

  authForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.maxLength(32)]],
    lastName: ['', [Validators.maxLength(32)]],
    type: ['', [Validators.maxLength(32)]],
    email: ['', [Validators.email]],
    password: ['', [Validators.minLength(6)]],
    firebaseId: ['', []],
  })

  ngOnInit() {
    this.userSubscription = this.authService.appUser$.subscribe(appUser => {
      if(!appUser) {
        console.error("User not found");
        return;
      };
      
      console.log("User type", appUser.type);

      if (appUser.type === 'admin') {
        this.router.navigate(['/admin']);
      } else if (appUser.type === 'student' || appUser.type === 'teacher') {
        this.router.navigate(['/dashboard']);
      } else {
        console.error("Unknown user type:", appUser.type);
      }
    })
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
  
  goToSignUp() {
      if(this.isSigningIn == true) {
        this.isSigningIn = false;
        console.log("Signing up");
      } else if(this.isSigningIn == false) {
        this.isSigningIn = true;
        console.log("Signing in");
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

  onSubmit() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
  
      if (this.isSigningIn) {
        this.authService.signIn(email, password)
          .catch((err) => {
            console.error("Login error:", err.message);
            // show error message to user
          });
      } else {
        const user = this.authForm.value;
        this.authService.signUp(user.email, user.password)
          .then((userCredential) => {
            console.log("Signed up:", userCredential.user);
            // this.router.navigate(['/dashboard']); // change to your actual route
            user.firebaseId = userCredential.user.uid
            this.authService.createUser(user)
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