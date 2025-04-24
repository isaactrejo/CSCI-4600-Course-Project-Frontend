import { Component, OnInit, inject } from '@angular/core';
import { CourseNavbarComponent } from '../course-navbar/course-navbar.component';
import { CommonModule } from '@angular/common';
import { MainNavbarComponent } from "../main-navbar/main-navbar.component";
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CourseNavbarComponent,
    CommonModule,
    MainNavbarComponent
  ],
  template: `

<div class="min-vh-100" style="background-color: #131313;">
      <!-- Course Navbar -->
       <app-main-navbar></app-main-navbar>
      <app-course-navbar></app-course-navbar>
      
      <!-- Main Content Area -->
      <div class="container mt-4">
        <!-- Tab Navigation -->
        <ul class="nav nav-tabs mb-3" role="tablist">

          <!-- Assignments Tab -->
          <li class="nav-item" role="presentation">
            <a 
              class="bg-dark nav-link active" 
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
              class="bg-dark nav-link" 
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
              class="bg-dark nav-link" 
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
              class="bg-dark nav-link" 
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
            <div class="bg-dark card dark-card p-4">
              <h4 class="mb-3">Assignments</h4>
              <div class="table-responsive">
                <table class="table table-dark table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Assignment</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody *ngIf="assignments.length > 0; else noAssignments">
                    <ng-container *ngFor="let assignment of assignments">
                      <tr>
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
            <div class="bg-dark card dark-card p-4">
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
            <div class="bg-dark card dark-card p-4">
              <h4 class="mb-3">Grades</h4>
              <p>
                Grades will be displayed here.
              </p>
            </div>
          </div>
          
          <!-- Discussion Tab Pane -->
          <div 
            class="tab-pane fade" 
            id="discussion" 
            role="tabpanel" 
            aria-labelledby="discussion-tab">
            <div class="bg-dark card dark-card p-4">
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
export class CourseComponent implements OnInit {

  courseId: string | null = null;
  assignments: any[] = [];
  courseName: string = '';

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log('Course ID:', this.courseId);

    if(this.courseId) {
      this.courseService.getCourseName(this.courseId).subscribe(name => {
        this.courseName = name || '';
      });

      this.courseService.getAssignments(this.courseId).subscribe(assignments => {
        this.assignments = assignments;
      });
    }
  }
}