import { Component } from '@angular/core';

@Component({
  selector: 'app-course-navbar',
  standalone: true,
  imports: [],
  template: `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
  <div class="container d-flex justify-content-between align-items-center">
    
    <ul class="navbar-nav d-flex flex-row">

      <li class="nav-item me-4">
        <a class="nav-link" routerLink="/grades">Announcements</a>
      </li>

      <li class="nav-item me-4">
        <a class="nav-link" routerLink="/grades">Content</a>
      </li>

      <!-- Support Dropdown -->
      <li class="nav-item dropdown me-4">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Support
        </a>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="https://library.apsu.edu/" target="_blank" rel="noopener noreferrer">
              APSU Library
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Another Support Link</a>
          </li>
        </ul>
      </li>

    </ul>

  </div>
</nav>

  `,
  styleUrl: './course-navbar.component.scss'
})
export class CourseNavbarComponent {

}
