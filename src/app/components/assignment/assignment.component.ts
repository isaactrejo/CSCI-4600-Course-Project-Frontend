import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [MainNavbarComponent, CommonModule, RouterModule],
  template: `
    <div style="background-color: #131313; min-height: 100vh;">
      <app-main-navbar></app-main-navbar>
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
         <p *ngIf="selectedFiles.length" class="mt-3">Selected File(s) ({{selectedFiles.length}}) </p>
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
        <!-- <form action="submit-assignment" method="post" enctype="multipart/form-data">
          <div class="mb-3">
            <label for="assignmentFile" class="form-label">Upload Assignment</label>
            <input 
              type="file" 
              class="form-control" 
              id="assignmentFile" 
              name="assignmentFile" 
              required>
          </div>
        </form> -->
      </div>
    </div>
  `,
  styleUrl: './assignment.component.scss'
})
export class AssignmentComponent implements OnInit {
  assignmentId: string | null = null;
  assignmentName: string | null = null;
  selectedFiles: File[] = [];
  hoveredIndex: number | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit() {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    console.log('Assignment Id:', this.assignmentId);

    if (this.assignmentId) {
      this.courseService.getAssignmentsById(this.assignmentId).subscribe(
        assignment => {
          this.assignmentName = assignment?.name || 'Assignment';
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
}
