import { AuthService } from 'src/app/services/auth.service';
import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
  ) => {
  const auth = inject(AuthService);
  console.log(`Authguard says no`)
  return auth.authenticationState();
};
