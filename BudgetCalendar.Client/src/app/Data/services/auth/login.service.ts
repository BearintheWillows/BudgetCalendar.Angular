import {inject, Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {IUserForAuthenticationResponse} from "../../types/auth/iAuthenticationResponse.dto";
import {IUserForAuthenticationDto} from "../../types/auth/iUserForAuthentication.dto";
import {AuthPaths} from "../../types/api/api-paths.constants";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  router = inject(Router);
  httpClient = inject(HttpClient);
  public login = (body: IUserForAuthenticationDto)  : string | null => {
    this.httpClient.post<IUserForAuthenticationResponse>(`${AuthPaths.Login}`, body).subscribe(
      (res) => {
        if (res.isAuthSuccessful && res.token) {
          localStorage.setItem("token", res.token);

          this.router.navigate(["/"]);

          return res.UserName;
        }
        return null;
      }
    );
    return null;
  };
}
