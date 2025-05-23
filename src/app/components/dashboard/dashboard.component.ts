import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router} from '@angular/router';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';
import { WorkDueComponent } from '../work-due/work-due.component';
import { User } from 'firebase/auth';
import { CourseService } from '../../services/course.service';
import { Course } from '../models/course';
import { AppUser } from '../models/appuser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardNavbarComponent,
    MainNavbarComponent,
    WorkDueComponent,
    NgIf,
    NgFor
  ],
  template: `
  <div>
    <div style="background-color:rgb(15, 15, 19); min-height: 100vh;">
      <app-main-navbar></app-main-navbar>
      <app-dashboard-navbar></app-dashboard-navbar>
    <div>
    
    <div class="container mt-4">
      <div class="row justify-content-center">
        
        <!-- Example: multiple cards side by side -->
        <div class="col-lg-9 text-center mb-3">
          <div class="card dark-card p-4 my-3">
            <h2 class="mb-3">My Courses</h2>
            <p *ngIf="!courses.length" class="text-muted">You have no current courses.</p>

            <div class="row g-3" *ngIf="courses.length">
              <div class="col-md-4" *ngFor="let course of courses">
                
                <div 
                  class="card dark-card h-100 shadow-sm"
                  [routerLink]="['/course', course.id]"
                  style="cursor: pointer;">
                  <img [src]="'https://picsum.photos/seed/' + course.id + '/400/200'" class="card-img-top" alt="Course image">
                  <div class="card-body">
                    <h5 class="card-title mb-1">{{ course.name }}</h5>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        
        <div class="col-lg-3 text-center mb-3">
          <!-- Here is our new WorkDue card -->
          <app-work-due></app-work-due>
        </div>

        <!-- Add more col-lg-4 for extra cards if desired -->
      
      </div>
    </div>
  </div>
  `,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  authService: AuthService = inject(AuthService);
  courseService: CourseService = inject(CourseService);

  user!: AppUser;
  courses: Course[] = [];

  signOut() {
    return this.authService.signOut();
  }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    this.courseService.getCourses(this.user.id).subscribe(courses => {
      this.courses = courses;
    })
  }
}
