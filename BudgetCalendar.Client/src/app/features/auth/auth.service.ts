import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Signal, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserForAuthenticationDto } from './_interfaces/iUserForAuthentication.dto';
import { environment } from 'src/environments/environment.development';
import { ApiPaths } from '../../shared/_enums/apiPaths';
import { IUserForAuthenticationResponse } from './_interfaces/iAuthenticationResponse.dto';
import { IUserForRegistration } from './_interfaces/iUserForRegistration.dto';
import { IRegistrationResponse } from './_interfaces/iRegistrationResponse.dto';
import { AuthStateService } from 'src/app/services/auth-state.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  jwtHelper = inject(JwtHelperService);
  httpClient = inject(HttpClient);
  authStateService = inject(AuthStateService);

  baseUrl = environment.baseUrl;

  public login = (body: IUserForAuthenticationDto) => {
    return this.httpClient.post<IUserForAuthenticationResponse>(`${this.baseUrl}${ApiPaths.Login}`, body);
  };

  public register = (body: IUserForRegistration) => {
    return this.httpClient.post<IRegistrationResponse>(`${this.baseUrl}${ApiPaths.Register}`, body)
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.authStateService.sendAuthStateChange(false);

  }


}
