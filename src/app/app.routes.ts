import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { CourseComponent } from './components/course/course.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], resolve: { user: AuthService} },
  { path: 'course', component: CourseComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];