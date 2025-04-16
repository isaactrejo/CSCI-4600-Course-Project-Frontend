import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
  <div class="container d-flex justify-content-between align-items-center">
    
    <ul class="navbar-nav d-flex flex-row">

      <li class="nav-item me-4">
        <a class="nav-link">Grades</a>
      </li>

      <li class="nav-item me-4">
        <a class="nav-link">Dashboard</a>
      </li>

      <li class="nav-item me-4">
        <a class="nav-link" routerLink="/course">Course</a>
      </li>

    </ul>
    
  </div>
</nav>
  `,
  styleUrl: './dashboard-navbar.component.scss'
})
export class DashboardNavbarComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  signOut() {
    return this.authService.signOut();
  }
}