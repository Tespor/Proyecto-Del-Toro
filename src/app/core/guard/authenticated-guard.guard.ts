import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthenticatedGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
    const router = inject(Router);
  
    if(authService.isAuthenticated()){
      return router.navigate(['/home']);
    } else {
      return true;
    }
};
