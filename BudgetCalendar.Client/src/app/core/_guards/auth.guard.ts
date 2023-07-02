import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from "../../Data/services/auth.service";

export const AuthGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isUserAuthenticated()) {
    return true;
  }

  router.navigate(["/auth/login"], {queryParams: {returnUrl: state.url}})

  return false;
};
