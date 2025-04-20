import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Course } from '../components/models/course';

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
}
