import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<nav class="navbar navbar-expand-lg navbar-dark px-4">
  <div class="container d-flex justify-content-between align-items-center">
    
    <ul class="navbar-nav d-flex flex-row">

      <!-- Support Dropdown -->
      <li class="nav-item dropdown me-4">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Support
        </a>
        <ul class="dropdown-menu dropdown-menu-start">
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
  styleUrl: './dashboard-navbar.component.scss'
})
export class DashboardNavbarComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  signOut() {
    return this.authService.signOut();
  }
}