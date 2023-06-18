import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Signal, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserForAuthenticationDto } from '../features/auth/_models/iUserForAuthenticationDto';
import { environment } from 'src/environments/environment.development';
import { ApiPaths } from '../shared/_enums/apiPaths';
import { IUserForAuthenticationResponse } from '../features/auth/_models/iUserForAuthenticationResponse';
import { IUserForRegistration } from '../features/auth/_models/iUserForRegistration';
import { IRegistrationResponse } from '../features/auth/_models/iRegistrationResponse';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public authenticationState = signal(false);

  jwtHelper = inject(JwtHelperService);
  httpClient = inject(HttpClient);

  baseUrl = environment.baseUrl;

  public sendAuthStateChange = (isAuthenticated: boolean) => {
    this.authenticationState.set(isAuthenticated);
  }


  public login = (body: IUserForAuthenticationDto) => {
    return this.httpClient.post<IUserForAuthenticationResponse>(`${this.baseUrl}${ApiPaths.Login}`, body);
  };

  public register = (body: IUserForRegistration) => {
    return this.httpClient.post<IRegistrationResponse>(`${this.baseUrl}${ApiPaths.Register}`, body)
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChange(false);
  }


}
