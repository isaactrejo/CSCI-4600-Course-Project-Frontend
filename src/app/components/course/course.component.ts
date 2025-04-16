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

<div class="bg-dark min-vh-100">
      <!-- Course Navbar -->
       <app-main-navbar></app-main-navbar>
      <app-course-navbar></app-course-navbar>
      
      <!-- Main Content Area -->
      <div class="container mt-4">
        <!-- Tab Navigation -->
        <ul class="nav nav-tabs mb-3" role="tablist">
          <li class="nav-item" role="presentation">
            <a 
              class="nav-link active" 
              id="assignments-tab" 
              data-bs-toggle="tab" 
              href="#assignments" 
              role="tab"
              aria-controls="assignments"
              aria-selected="true">
              Assignments
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a 
              class="nav-link" 
              id="grades-tab" 
              data-bs-toggle="tab" 
              href="#grades" 
              role="tab"
              aria-controls="grades"
              aria-selected="false">
              Grades
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a 
              class="nav-link" 
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
              <h4 class="mb-3">Assignments</h4>
              <p class="text-muted">
                No assignments due yet. (Content to be loaded from SQL later.)
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
              <p class="text-muted">
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
            <div class="card dark-card p-4">
              <h4 class="mb-3">Discussion</h4>
              <p class="text-muted">
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
