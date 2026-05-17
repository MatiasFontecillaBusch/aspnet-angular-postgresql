import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authenticationService.currentUser()) {
    return router.createUrlTree(['/'], {
      queryParams: { returnUrl: state.url },
    });
  }

  return true;
};
