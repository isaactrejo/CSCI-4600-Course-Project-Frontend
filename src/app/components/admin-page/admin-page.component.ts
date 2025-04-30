import { Component } from '@angular/core';
import { MainNavbarComponent } from "../main-navbar/main-navbar.component";
import { DashboardNavbarComponent } from "../dashboard-navbar/dashboard-navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [MainNavbarComponent, DashboardNavbarComponent, CommonModule, FormsModule],
  template: `
    <div style="background-color:rgb(15, 15, 19); min-height: 100vh;">
      <app-main-navbar></app-main-navbar>
      <app-dashboard-navbar></app-dashboard-navbar>

      <div class="container mt-4">
        <div class="card dark-card p-4 my-3">
          <h3 class="mb-3">Manage Users</h3>
          <div class="mb-3">
            <input
              type="text"
              class="form-control dark-input text-white"
              placeholder="Search users"
              [(ngModel)]="searchQuery"
            />
          </div>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of filteredUsers()">
                <td>{{ user.name }}</td>
                <td>{{ user.type }}</td>
                <td>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                      <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu" aria-labeledby="dropdownMenuButton">
                      <li><a class="dropdown-item" (click)="editUser(user)">Edit User</a></li>
                      <li><a class="dropdown-item" (click)="deleteUser(user)">Delete User</a></li>
                      <li><a class="dropdown-item" (click)="manageClasses(user)">Add/Remove From Class</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary mt-3" (click)="createUser()">Create User</button>
        </div>

        <!-- Manage Courses -->
         <div class="card dark-card p-4 my-3">
          <h3 class="mb-3">Manage Courses</h3>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let coures of courses">
                <td>{{ coures.name }}</td>
                <td>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                  >
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" (click)="editCourse(courses)">Edit Course</a></li>
                    <li><a class="dropdown-item" (click)="deleteCourse(courses)">Delete Course</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-primary mt-3" (click)="createCourse()">Create Course</button>
      </div>
      </div>
    </div>
  `,
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  searchQuery: string = '';
  users: any[] = [];
  courses: any[] = [];
  userPage: number = 1;
  coursePage: number = 1;
  pageSize: number = 10;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.fetchUsers();
    this.fetchCourses();
  }

  fetchUsers() {
    this.courseService.getPaginatedUsers(this.userPage, this.pageSize).subscribe({
      next: response => {
        this.users = [...this.users, ...response.data];
      },
      error: error => {
        console.error('Error fetching users:', error);
      }
    });
  }
  
  fetchCourses() {
    this.courseService.getPaginatedCourse(this.coursePage, this.pageSize).subscribe({
      next: response => {
        this.courses = [...this.courses, ...response.data];
      },
      error: error => {
        console.error('Error fetching courses:', error);
      }
    });
  }

  loadMoreUsers() {
    this.userPage++;
    this.fetchUsers();
  }

  loadMoreCourses() {
    this.coursePage++;
    this.fetchCourses();
  }

  filteredUsers() {
    return this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  createUser() {
    console.log('Create user clicked');
  }

  editUser(user: any) {
    console.log('Edit user clicked for:', user);
  }

  deleteUser(user: any) {
    console.log('Manage classes clicked for:', user);
  }

  manageClasses(user: any) {
    console.log('Manage classes clicked for:', user);
  }

  createCourse() {
    console.log('Create course clicked');
  }

  editCourse(course: any) {
    console.log('Edit course clicked for:', course);
  }

  deleteCourse(course: any) {
    console.log('Delete course clicked for:', course);
  }
}
