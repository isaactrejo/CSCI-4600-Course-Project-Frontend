import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
],
  template: `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <h3 class="container d-flex justify-content-between align-items-center">
    <a class="navbar-brand" routerLink="/dashboard">
      <img 
        class="img-fluid"
        src="https://1000logos.net/wp-content/uploads/2019/09/Austin-Peay-Governors-Logo-1976.png" 
        alt="Apsu" 
        [style.maxWidth.px]="80"
        style="height: auto;">
    </a>
    <ul class="navbar-nav d-flex flex-row">
      <li class="nav-item me-4">
        <a class="nav-link" routerLink="/dashboard">
          <span class="material-symbols-rounded filled-icon">dashboard</span>
        </a>
      </li>

      <li class="nav-item me-4">
        <a class="nav-link">
          <i class="bi bi-chat-left-text-fill"></i>
        </a>
      </li>

      <!-- Profile dropdown item -->
      <li class="nav-item dropdown me-4">
        <a 
          class="nav-link dropdown-toggle" 
          href="#" 
          role="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false">
          <i class="bi bi-person-square"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <a class="dropdown-item" routerLink="/profile">Profile Settings</a>
          </li>
          <li>
            <button class="dropdown-item" (click)="signOut()">Logout</button>
          </li>
        </ul>
      </li>
    </ul>
  </h3>
</nav>
  `,
  styleUrl: './main-navbar.component.scss'
})
export class MainNavbarComponent {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  
  signOut() {
    return this.authService.signOut();
  }
}
