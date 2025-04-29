import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Assignment } from '../models/assignment.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-due',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card dark-card p-4 my-3">
      <h3 class="mb-3">Work Due</h3>
      <div class="assignment-list">
        <div *ngIf="groupedAssignments.length > 0; else noAssignments">
          <div *ngFor="let group of groupedAssignments">
            <h4 class="text-white">{{ group.dateRange }}</h4>
            <ul>
              <li *ngFor="let assignment of group.assignments">
                <strong>{{ assignment.name }}</strong> - Due {{ assignment.dueDate | date: 'mediumDate' }}
              </li>
            </ul>
          </div>
        </div>
        <ng-template #noAssignments>
          <p class="mb-0">No assignments due yet.</p>
        </ng-template>
      </div>
    </div>
  `,
  styleUrl: './work-due.component.scss'
})
export class WorkDueComponent implements OnInit {
  groupedAssignments: { dateRange: string; assignments: Assignment[] }[] = [];
  route: ActivatedRoute = inject(ActivatedRoute);
  
  constructor(
    private courseService: CourseService) { }

  ngOnInit() {
    const user = this.route.snapshot.data['user'];
    this.courseService.getAllAssignments(user.id).subscribe(assignments => {
      const sortedAssignments = assignments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      this.groupedAssignments = this.groupAssignmentsByTwoWeeks(sortedAssignments);
    })
  }

  private groupAssignmentsByTwoWeeks(assignments: Assignment[]): { dateRange: string; assignments: Assignment[] }[] {
    const grouped: { dateRange: string; assignments: Assignment[] }[] = [];
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    assignments.forEach(assignment => {
      const dueDate = new Date(assignment.dueDate);

      if (!startDate || dueDate > endDate!) {
        startDate = dueDate;
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 14);

        grouped.push({
          dateRange: `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`,
          assignments: []
        });
      }

      grouped[grouped.length - 1].assignments.push(assignment);
    });

    return grouped;
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
}
