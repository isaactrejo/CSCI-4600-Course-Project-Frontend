import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private base: string = 'http://localhost:3000';
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/courses`);
  }
}
