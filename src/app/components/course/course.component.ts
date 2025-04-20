import { Component } from '@angular/core';
import { CourseNavbarComponent } from '../course-navbar/course-navbar.component';
import { CommonModule } from '@angular/common';
import { MainNavbarComponent } from "../main-navbar/main-navbar.component";

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
              <p>
                No assignments due yet. (Content to be loaded from SQL later.)
              </p>
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
  styleUrl: './course.component.scss'
})
export class CourseComponent {

}
