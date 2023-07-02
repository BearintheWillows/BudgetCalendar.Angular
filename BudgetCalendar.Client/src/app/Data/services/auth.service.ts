import { Injectable, inject, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {LoginService} from "./auth/login.service";
import {RegisterService} from "./auth/register.service";
import {IUserForAuthenticationDto} from "../types/auth/iUserForAuthentication.dto";
import {IUserForRegistration} from "../types/auth/iUserForRegistration.dto";
import {LogoutService} from "./auth/logout.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginService = inject(LoginService);
  registerService = inject(RegisterService);
  logoutService = inject(LogoutService);
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

  login = (body: IUserForAuthenticationDto): void => {
    this.loginService.login(body);
  }

  logout = () => {
    this.logoutService.logout();
    this.authenticationState.set(false);
  }

  public register = (body: IUserForRegistration)=> {
    this.registerService.register(body);
  }


}
