import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';
import { WorkDueComponent } from '../work-due/work-due.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardNavbarComponent,
    MainNavbarComponent,
    WorkDueComponent,
  ],
  template: `
  <div>
  <app-main-navbar></app-main-navbar>
  <app-dashboard-navbar></app-dashboard-navbar>
  
  <div class="container-fluid mt-4">
    <div class="row justify-content-center">
      
      <!-- Example: multiple cards side by side -->
      <div class="col-lg-4 text-center mb-3">
        <div class="card dark-card p-4 my-3">
          <h2 class="mb-3">My Courses</h2>
          <p class="text-muted">You have no current courses.</p>
        </div>
      </div>
      
      <div class="col-lg-4 text-center mb-3">
        <!-- Here is our new WorkDue card -->
        <app-work-due></app-work-due>
      </div>

      <!-- Add more col-lg-4 for extra cards if desired -->
    
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
