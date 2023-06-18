import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from 'src/app/services/auth-state.service';

export const AuthGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => {
  const auth = inject(AuthStateService);
  const router = inject(Router);
  
  if (auth.isUserAuthenticated()) {
    return true;
  }

  router.navigate(["/auth/login"], {queryParams: {returnUrl: state.url}})

  return false;
};
