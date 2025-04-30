import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="container mt-4">
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Assignment</th>
            <th scope="col">Grade</th>
            <!-- <th scope="col">Feedback</th> -->
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let assignment of assignments">
            <td>{{ assignment.name }}</td>
            <td>{{ assignment.grade }}</td>
            <!-- <td>{{ grade.feedback }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './grades.component.scss'
})
export class GradesComponent implements OnInit {
  @Input() userId: string = '';
  assignments: { name: string; grade: string }[] =[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('GradesComponent initialized with userId:', this.userId);
    if (this.userId) {
      this.fetchGrades(this.userId);
    }
  }

  fetchGrades(userId: string) {
    console.log('Fetching grades for user:', userId);
    this.http.get<any[]>(`http://localhost:5149/api/Submission/grades/${userId}`).subscribe({
      next: (response) => {
        this.assignments = response.map((submission) => ({
          name: submission.assignment.name,
          grade: submission.status === 'Graded' ? `${submission.score}/100` : '--/--'
        }));
      },
      error: (error) => {
        console.error('Error fetching grades:', error);
      }
    });
  }
}
