import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<nav class="navbar navbar-expand-lg navbar-dark">
  <h3 class="container d-flex justify-content-between align-items-center">
    <a class="navbar-brand" routerLink="/dashboard">
      <img 
        class="img-fluid"
        src="https://1000logos.net/wp-content/uploads/2019/09/Austin-Peay-Governors-Logo-1976.png" 
        alt="Apsu" 
        [style.maxWidth.px]="90"
        style="height: auto;">
    </a>
    <!-- Where title course title will be either name or blank ie (name || '')-->
    <span class="navbar-text text-white" style="font-size: 1.1em;">{{ courseName || '' }}</span>

    <ul class="navbar-nav d-flex flex-row">
      <li class="nav-item me-4">
        <a class="nav-link" routerLink="/dashboard">
          <span class="material-symbols-rounded filled-icon" style="font-size: 1.1em;">dashboard</span>
        </a>
      </li>

      <li class="nav-item me-4">
        <a class="nav-link">
          <i class="bi bi-chat-left-text-fill" style="font-size: 1.1em;"></i>
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
          <i class="bi bi-person-square" style="font-size: 1.1em;"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <a class="text-white dropdown-item" routerLink="/profile">Profile Settings</a>
          </li>
          <li>
            <button class="text-white dropdown-item" (click)="signOut()">Logout</button>
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
  @Input() courseName: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  
  signOut() {
    return this.authService.signOut();
  }
}
