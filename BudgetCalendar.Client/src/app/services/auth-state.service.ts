import { Injectable, inject, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  jwtHelper = inject(JwtHelperService);

  public authenticationState = signal(false);

  public sendAuthStateChange = (isAuthenticated: boolean) => {
    this.authenticationState.set(isAuthenticated);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      this.authenticationState.set(true);
      return true;
    }

    this.authenticationState.set(false);
    return false;
  }
}
