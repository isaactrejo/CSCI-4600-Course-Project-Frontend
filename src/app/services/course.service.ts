import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
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

  getAssignmentsById(assignmentId: string, courseId: string): Observable<Assignment | undefined> {
    return this.getAssignments(courseId).pipe(
      map(assignments => {
        const assignment = assignments.find(a => a.id.toString() === assignmentId);
        if (!assignment) {
          console.warn(`Assignment with ID ${assignmentId} not found in coures ${courseId} not found in coures ${courseId}`);
        }
        return assignment;
      }),
      tap(assignment => console.log('Filtered assignment:', assignment)),
      catchError(error => {
        console.error(`Error fetching assignments for course ${courseId}:`, error);
        return of(undefined);
      })
    );
  }

  getAllAssignments(id: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.base}/submission/${id}`);
  }

  getCourseName(userId: string, courseId: string): Observable<string> {
    return this.http.get<Course[]>(`${this.base}/course/${userId}`).pipe(
      tap(courses => console.log('Courses fetched from API:', courses)), // Log the API response
      map(courses => {
        const course = courses.find(c => c.id.toString() === courseId); // Match course by ID
        if (!course) {
          console.warn(`Course with ID ${courseId} not found for user ${userId}`);
          return 'Unknown Course';
        }
        return course.name;
      }),
      catchError(error => {
        console.error(`Error fetching courses for user ${userId}:`, error);
        return of('Unknown Course');
      })
    );
  }

  getPaginatedUsers(page: number, pageSize: number): Observable<{ data: any[]; total: number }> {
    return this.http.get<{ data: any[]; total: number }>(`${this.base}/user?page=${page}&pageSize=${pageSize}`);
  }
  
  getPaginatedCourse(page: number, pageSize: number): Observable<{ data: any[]; total: number }> {
    return this.http.get<{ data: any[]; total: number }>(`${this.base}/course?page=${page}&pageSize=${pageSize}`);
  }

  getGrades(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/Submission/grades/${userId}`);
  }
}

