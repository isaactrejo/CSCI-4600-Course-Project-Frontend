import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="card dark-card p-4 my-3">
      <h3 class="mb-3">Grades</h3>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Assignment</th>
            <th scope="col">Grade</th>
            <th scope="col">Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let grade of grades">
            <td>{{ grade.assignmentName }}</td>
            <td>{{ grade.grade }}</td>
            <td>{{ grade.feedback }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './grades.component.scss'
})
export class GradesComponent implements OnInit {
  @Input() courseId: string = '';
  grades: { assignmentName: string; grade: string; feedback: string } [] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.courseId) {
      this.fetchGrades(this.courseId);
    }
  }

  fetchGrades(courseId: string) {
    this.http.get<any[]>(`http://localhost:3000/grades?courseId=${courseId}`).subscribe((grades) => {
      this.grades = grades.map((grade) => ({
        assignmentName: grade.assignmentName,
        grade: `${grade.score}/${grade.total}`,
        feedback: grade.feedback || 'No feedback provided'
      }));
    });
  }
}
