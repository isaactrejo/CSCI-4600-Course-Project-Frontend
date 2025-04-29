import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Course } from '../components/models/course';
import { Assignment } from '../components/models/assignment.models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private base: string = 'http://localhost:5149/api';
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getCourses(id: number): Observable<Course[]> {
    return this.http.get<any[]>(`${this.base}/course/${id}`);
  }

  getAssignments(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/assignment/${courseId}`);
  }

  getAssignmentsById(assignmentId: string): Observable<any> {
    return this.http.get<any>(`${this.base}/assignment/${assignmentId}`);
  }

  getCourseName(courseId: string): Observable<string | undefined> {
    return this.http.get<Course[]>(`${this.base}/courses`).pipe(
      map(courses => {
        const course = courses.find(course => course.id === courseId);
        return course ? course.name : undefined;
      })
    );
  }

  getAllAssignments(id: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.base}/submission/${id}`);
  }
}
