import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [MainNavbarComponent, CommonModule, RouterModule],
  template: `
    <div style="background-color: #131313; min-height: 100vh;">
      <app-main-navbar></app-main-navbar>
      <div class="container mt-4 text-white">
        <h1>Assignment</h1>
        <p>This is the assignment component.</p>
      </div>
      <div class ="container mt-4 text-white">
        <p>Attachments</p>
      </div>
      <div class="container mt-4 py-4 text-white">
        <h4>Submit Assignment</h4>
        <form action="submit-assignment" method="post" enctype="multipart/form-data">
          <div class="mb-3">
            <label for="assignmentFile" class="form-label">Upload Assignment</label>
            <input 
              type="file" 
              class="form-control" 
              id="assignmentFile" 
              name="assignmentFile" 
              required>
          </div>
  `,
  styleUrl: './assignment.component.scss'
})
export class AssignmentComponent {

}
