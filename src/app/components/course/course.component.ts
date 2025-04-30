import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CourseNavbarComponent } from '../course-navbar/course-navbar.component';
import { CommonModule } from '@angular/common';
import { MainNavbarComponent } from "../main-navbar/main-navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { map, Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GradesComponent } from '../grades/grades.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CourseNavbarComponent,
    CommonModule,
    MainNavbarComponent,
    GradesComponent
  ],
  template: `

<div class="min-vh-100" style="background-color:rgb(15, 15, 19);">
      <!-- Course Navbar -->
       <!-- give navbar course name -->
       <app-main-navbar [courseName]="courseName"></app-main-navbar>
      <app-course-navbar></app-course-navbar>
      
      <!-- Main Content Area -->
      <div class="container mt-4">
        <!-- Tab Navigation -->
        <ul class="nav nav-tabs mb-3" role="tablist">

          <!-- Assignments Tab -->
          <li class="card dark-card nav-item" role="presentation">
            <a 
              class="nav-link active text-white"
              style = "background-color: rgba(46, 46, 49, 1);" 
              id="assignments-tab" 
              data-bs-toggle="tab" 
              href="#assignments" 
              role="tab"
              aria-controls="assignments"
              aria-selected="true">
              Assignments
            </a>
          </li>
          <!-- Quiz -->
          <li class="nav-item" role="presentation">
            <a 
              class="nav-link text-white" 
              style = "background-color: rgba(46, 46, 49, 1);" 
              id="quizzes-tab" 
              data-bs-toggle="tab" 
              href="#quizzes" 
              role="tab"
              aria-controls="quizzes"
              aria-selected="false">
              Quizzes
            </a>
          </li>
          
          <!-- Grades Tab -->
          <li class="nav-item" role="presentation">
            <a 
              class="nav-link text-white" 
              style = "background-color: rgba(46, 46, 49, 1);" 
              id="grades-tab" 
              data-bs-toggle="tab" 
              href="#grades" 
              role="tab"
              aria-controls="grades"
              aria-selected="false">
              Grades
            </a>
          </li>

          <!-- Discussion Tab -->
          <li class="nav-item" role="presentation">
            <a 
              class="nav-link text-white" 
              style = "background-color: rgba(46, 46, 49, 1);" 
              id="discussion-tab" 
              data-bs-toggle="tab" 
              href="#discussion" 
              role="tab"
              aria-controls="discussion"
              aria-selected="false">
              Discussion
            </a>
          </li>
        </ul>
        
        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Assignments Tab Pane -->
          <div 
            class="tab-pane fade show active" 
            id="assignments" 
            role="tabpanel" 
            aria-labelledby="assignments-tab">
            <div class="card dark-card p-4">
              <h4 class="mb-3">Assignments Table</h4>
              <div class="table-responsive">
                <table class="table table-dark table-striped table-hover">                  <thead>
                    <tr>
                      <th scope="col">Assignment</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody *ngIf="assignments.length > 0; else noAssignments">
                    <ng-container *ngFor="let assignment of assignments">
                      <tr (click)="navigateToAssignment(assignment.id)" style="cursor: pointer;">
                        <td>{{ assignment.name }}</td>
                        <td>{{ assignment.dueDate }}</td>
                        <td>{{ assignment.status }}</td>
                      </tr>
                    </ng-container>
                  </tbody>
                </table>
                <ng-template #noAssignments>
                  <p class="text-muted">No assignments available.</p>
                </ng-template>
              </div>
            </div>
          </div> 

          <!-- Quizzes Tab Pane -->
          <div 
            class="tab-pane fade" 
            id="quizzes" 
            role="tabpanel" 
            aria-labelledby="quizzes-tab">
            <div class="card dark-card p-4">
              <h4 class="mb-3">Quizzes</h4>
              <p>
                No quizzes due yet. (Content to be loaded from SQL later.)
              </p>
            </div>
          </div>
          
          <!-- Grades Tab Pane -->
          <div 
            class="tab-pane fade" 
            id="grades" 
            role="tabpanel" 
            aria-labelledby="grades-tab">
            <div class="card dark-card p-4">
              <h4 class="mb-3">Grades</h4>
              <div *ngIf="grades.length > 0; else noGrades">
                <app-grades [userId]="userId"></app-grades>
              </div>
              <ng-template #noGrades>
                <p> No grades available for this course.</p>
              </ng-template>
            </div>
          </div>
          
          <!-- Discussion Tab Pane -->
          <div 
            class="tab-pane fade" 
            id="discussion" 
            role="tabpanel" 
            aria-labelledby="discussion-tab">
            <div class="card dark-card p-4">
              <h4 class="mb-3">Discussion</h4>
              <p>
                Discussion board coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  `,
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  courseId: string | null = null;
  assignments: any[] = [];
  courseName: string = '';
  grades: any[] = [];
  userId: string = '';

  constructor(
    private route: ActivatedRoute, 
    private courseService: CourseService, 
    private router: Router,
    private authService: AuthService) { }

    ngOnInit() {
      this.courseId = this.route.snapshot.paramMap.get('id');
      console.log('Course ID:', this.courseId);
    
      this.authService.getUserId()
        .pipe(
          take(1),
        )
        .subscribe({
          next: userId => {
            console.log('User ID:', userId);
            this.userId = userId; // Assign the userId to the component property
    
            if (this.courseId) {
              this.courseService.getCourseName(userId, this.courseId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                  next: name => {
                    this.courseName = name;
                    console.log('Course Name:', this.courseName);
                  },
                  error: error => console.error('Error fetching course name:', error)
                });
    
              this.courseService.getAssignments(this.courseId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                  next: assignments => {
                    this.assignments = assignments;
                    console.log('Assignments:', this.assignments);
                  },
                  error: error => console.error('Error fetching assignments:', error)
                });
            }

            this.fetchGrades(userId);
            console.log('User ID passed to GradesComponent:', this.userId);
          },
          error: error => console.error('Error fetching user ID:', error)
        });
    }

  navigateToAssignment(assignmentId: string) {
    if (this.courseId) {
      this.router.navigate(['/assignments', assignmentId], { queryParams: { courseId: this.courseId } });
    } else {
      console.error('Course ID is not available for navigation.');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchGrades(userId: string) {
    this.courseService.getGrades(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: grades => {
          this.grades = grades;
          console.log('Grades:', this.grades);
        },
        error: error => console.error('Error fetching grades:', error)
      });
  }
}