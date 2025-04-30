import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [MainNavbarComponent, CommonModule, RouterModule, FormsModule],
  template: `
    <div style="background-color:rgb(15, 15, 19); min-height: 100vh;">
      <app-main-navbar [courseName]="courseName"></app-main-navbar>
      <div class="container mt-4 text-white">
        <h1>{{ assignmentName || 'Assignment '}}</h1>
        <p>This is the assignment component.</p>
      </div>
      <div class ="container mt-4 text-white">
        <p>Attachments</p>
      </div>
      <div class="container mt-4 py-4 text-white">
        <h4>Submit Assignment</h4>
        <button class="btn add-btn" (click)="triggerFileInput()">Add File(s)</button>
        <input
          type="file"
          #fileInput
          style="display: none;"
          (change)="onFileSelected($event)"
          multiple
        />
        <!-- Show selected files -->
         <p class="mt-3">Selected File(s) ({{selectedFiles.length}}). Remember to submit.</p>
         <div class="file-list mt-3">
          <div
            class="file-item"
            *ngFor="let file of selectedFiles; let i = index"
            (mouseover)="hoveredIndex = i"
            (mouseleave)="hoveredIndex = null"
            >
            <span>{{ file.name }}</span>
            <button
              class="remove-btn"
              *ngIf="hoveredIndex === i"
              (click)="removeFile(i)"
            >X</button>
          </div>
         </div>
        <div class="contrainer mt-4 text-white">
          <p>Leave a Comment</p>
          <textarea
            class="form-control comment-box"
            [(ngModel)]="comment"
            rows="4"
            placeholder="Write your comment here..."
          ></textarea>
          <button
            class="btn submit-btn mt-3"
            (click)="submitAssignment()"
            >
            Submit
          </button>

          <div *ngIf="submissionAttempted && submissionSuccess" class="alert alert-success mt-3">
            Assignment submitted successfully.
          </div>
          <div *ngIf="submissionAttempted && !submissionSuccess" class="alert alert-danger mt-3">
            Error: You must add at least one file before submitting.
        </div>
      </div>
    </div>
  `,
  styleUrl: './assignment.component.scss'
})
export class AssignmentComponent implements OnInit {
  assignmentId: string | null = null;
  assignmentName: string | null = null;
  courseName: string = '';
  selectedFiles: File[] = [];
  hoveredIndex: number | null = null;
  comment: string = '';
  submissionSuccess: boolean = false;
  submissionAttempted: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    console.log('Assignment Id:', this.assignmentId);
  
    if (this.assignmentId) {
      const courseId = this.route.snapshot.queryParamMap.get('courseId');
      if (!courseId) {
        console.error('Course ID not found in query parameters.');
        return;
      }
      this.courseService.getAssignmentsById(this.assignmentId, courseId).subscribe(
        assignment => {
          if (assignment) {
            console.log('Fetched assignment details:', assignment);
            this.assignmentName = assignment.name;
            const courseId = assignment.courseId;
  
            if (courseId) {
              this.authService.getUserId()
                .pipe(take(1))
                .subscribe(userId => {
                  this.courseService.getCourseName(userId, courseId.toString())
                    .subscribe({
                      next: name => {
                        this.courseName = name;
                        console.log('Course Name:', this.courseName);
                      },
                      error: error => console.error('Error fetching course name:', error)
                    });
                });
            } else {
              console.warn('No course ID found for this assignment.');
            }
          } else {
            console.warn('Assignment not found.');
          }
        },
        error => {
          console.error('Error fetching assignment:', error);
        }
      );
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => this.selectedFiles.push(file));
      console.log('Selected files:', this.selectedFiles);
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  submitAssignment() {
    this.submissionAttempted = true;

    setTimeout(() => {
      if (this.selectedFiles.length === 0) {
        console.error('At least one file must be selected to submit.');
        this.submissionSuccess = false;
        return;
      }

      if (this.selectedFiles.length === 0) {
        console.error('At least one file must be selected to submit.');
        return;
      }

      console.log('Submitting assignment...');
      if (this.selectedFiles.length > 0) {
        console.log('Files:', this.selectedFiles);
      }
      if (this.comment.trim()) {
        console.log('Comment:', this.comment);
      }

      setTimeout(() => {
        this.submissionSuccess = true;
        this.selectedFiles = [];
        this.comment = '';
        console.log('Assignment submitted successfully');
      }, 1000);
    }, 500);
  }
}
