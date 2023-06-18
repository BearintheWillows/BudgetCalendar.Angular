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

    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }

    return false;
  }
}
