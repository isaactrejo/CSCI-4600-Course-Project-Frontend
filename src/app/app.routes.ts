import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { CourseComponent } from './components/course/course.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'course', component: CourseComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];