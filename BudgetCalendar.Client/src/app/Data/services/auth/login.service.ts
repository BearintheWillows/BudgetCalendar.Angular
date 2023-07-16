import {inject, Injectable, signal} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {IUserForAuthenticationResponse} from "../../types/auth/iAuthenticationResponse.dto";
import {IUserForAuthenticationDto} from "../../types/auth/iUserForAuthentication.dto";
import {AuthPaths} from "../../types/api/api-paths.constants";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  router = inject(Router);
  httpClient = inject(HttpClient);
  userName = signal("");
  public login = (body: IUserForAuthenticationDto) : Subscription  => {

   return  this.httpClient.post<IUserForAuthenticationResponse>(`${AuthPaths.Login}`, body).subscribe(
      (res) => {
        if (res.isAuthSuccessful && res.token) {
          localStorage.setItem("token", res.token);
          if (res.userName != null) {
            this.userName.set(res.userName);
          }
          this.router.navigate(["/"]);

        }
      });
  };
}
