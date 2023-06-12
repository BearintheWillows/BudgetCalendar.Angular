import {CanActivateChildFn, CanActivateFn} from '@angular/router';

export const authGuard: CanActivateChildFn = (route, state) => {
  return true;
};
