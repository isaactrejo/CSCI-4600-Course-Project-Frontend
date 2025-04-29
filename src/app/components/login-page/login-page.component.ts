import { NgClass, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { take, tap } from 'rxjs';

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

  passwordFieldType: string = 'password';
  passwordIcon: string = 'bi-eye-slash';

  isSigningIn: boolean = true;

  authForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  ngOnInit() {
    this.authService.isLoggedIn().pipe(
      take(1),
      tap((isAllowed) => {
        if (isAllowed) {
          this.router.navigate(['/dashboard']);
        }
      })
    ).subscribe();
  }
  
  goToSignUp() {
    
    /**
      sudo coding to visualize  

      boolean isSingingIn = true;
      
      if(isSinging true) {isSingingture fasle}
      else if (isSinging false) {iSing true}


     */
    
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

            const user = this.getUserByEmail(email);

            if(user) {
              console.log("User type", user.type);

              if (user.type === 'admin') {
                this.router.navigate(['/admin']);
              } else if (user.type === 'student' || user.type === 'teacher') {
                this.router.navigate(['/dashboard']);
              } else {
                console.error("Unknown user type:", user.type);
              }
            } else {
              console.error("User not found");
            }
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

  private getUserByEmail(email: string) {
    const users = [
      { id: "Q4iCasahdPNYIijgw7gR7rTWKAR2", name: "Samuel Trejo", email: "mrto0ns@live.com", type: "student" },
      { id: "DpXGwlEdYwc1esie02x6m6b1hVQ2", name: "Isaac Trejo", email: "xxxblindzniper@gmail.com", type: "student" },
      { id: "ORmOe8QDmlgGUzV5EPv3cQpMxrG2", name: "David Trejo", email: "trejo.david@hotmail.com", type: "teacher" },
      { id: "E0hN1Wz9YBUA5pW4xODRK3BvJVu1", name: "Aleciya Summers", email: "aleciyanicolesummers50@gmail.com", type: "admin" }
    ];

    return users.find(user => user.email === email);
  }
  
}