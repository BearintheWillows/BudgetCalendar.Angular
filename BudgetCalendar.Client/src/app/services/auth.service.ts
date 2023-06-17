import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Signal, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserForAuthenticationDto } from '../features/auth/_models/iUserForAuthenticationDto';
import { environment } from 'src/environments/environment.development';
import { ApiPaths } from '../shared/_enums/apiPaths';
import { IUserForAuthenticationResponse } from '../features/auth/_models/iUserForAuthenticationResponse';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = inject(JwtHelperService);
  httpClient = inject(HttpClient);

  baseUrl = environment.baseUrl;


  public isAuthenticated = signal(false);

  public login = (body: IUserForAuthenticationDto) => {
    return this.httpClient.post<IUserForAuthenticationResponse>(`${this.baseUrl}${ApiPaths.Login}`, body);
  };
}
