import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <a class="navbar-brand">Unipal</a>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link">Grades</a>
          </li>
          <li class="nav-item"><a class="nav-link">Dashboard</a></li>
            
        </ul>
        <button (click)="signOut()">Logout</button>
      </nav>
    </header>
    <div>
      <div class="container-fluid mt-4">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="card shadow-sm p-4">
              <h2 class="mb-3">My Courses</h2>
              <p class="text-muted">You have no current courses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  signOut() {
    return this.authService.signOut();
  }
}
