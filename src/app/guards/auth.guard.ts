import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    take(1),
    tap((isAllowed) => {
      console.log('AuthGuard: isLoggedIn =', isAllowed);
      if (!isAllowed) {
        router.navigate(['/']);
      }
    })
  );
};