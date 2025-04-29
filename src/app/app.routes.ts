import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { CourseComponent } from './components/course/course.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { AuthService } from './services/auth.service';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], resolve: { user: AuthService} },
  { path: 'admin', component: AdminPageComponent, canActivate: [authGuard] },
  { path: 'course/:id', component: CourseComponent, canActivate: [authGuard] },
  { path: 'assignments/:id', component: AssignmentComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];