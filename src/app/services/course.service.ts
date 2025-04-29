import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Course } from '../components/models/course';
import { Assignment } from '../components/models/assignment.models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private base: string = 'http://localhost:3000';
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getCourses(uuid: string): Observable<Course[]> {
    // return this.http.get<any[]>(`${this.base}/courses/${uuid}`);

    return this.http.get<any[]>(`${this.base}/enrollments?userId=${uuid}`).pipe(
      switchMap(enrollments => {
        const courseIds = enrollments.map(e => e.courseId).join(',');
        return this.http.get<Course[]>(`${this.base}/courses`).pipe(
          map(courses => courses.filter(course => courseIds.includes(course.id)))
        );
      })
    );
  }

  getAssignments(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/assignments`).pipe(
      map(assignments => assignments.filter(assignment => assignment.courseId === courseId))
    );
  }

  getAssignmentsById(assignmentId: string): Observable<any> {
    return this.http.get<any>(`${this.base}/assignments/${assignmentId}`);
  }

  getCourseName(courseId: string): Observable<string | undefined> {
    return this.http.get<Course[]>(`${this.base}/courses`).pipe(
      map(courses => {
        const course = courses.find(course => course.id === courseId);
        return course ? course.name : undefined;
      })
    );
  }

  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.base}/assignments`);
  }
}
