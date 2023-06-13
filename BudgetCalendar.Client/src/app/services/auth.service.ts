import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Signal, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserForAuthenticationDto } from '../features/auth/_models/iUserForAuthenticationDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = inject(JwtHelperService);
  httpClient = inject(HttpClient);


  public isAuthenticated = signal(false);

  public loginUser = (body: IUserForAuthenticationDto) => {
    return this.httpClient.post('https://localhost:44305/api/auth/login', body);
  })
}
