import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-due',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card bg-dark dark-card p-4 my-3">
      <h3 class="mb-3">Work Due</h3>
      <p class="mb-0">
        <!-- Future assingments info goes here -->
         No assignments due yet.
      </p>
    </div>
  `,
  styleUrl: './work-due.component.scss'
})
export class WorkDueComponent {

}
