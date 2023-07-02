import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthPaths} from "../../types/api/api-paths.constants";
import {IRegistrationResponse} from "../../types/auth/iRegistrationResponse.dto";
import {IUserForRegistration} from "../../types/auth/iUserForRegistration.dto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpClient = inject(HttpClient);
  router = inject(Router);
  public register = (body: IUserForRegistration) => {
    this.httpClient.post<IRegistrationResponse>(`${AuthPaths.Register}`, body).subscribe(result => {
        if (result.isSuccessful) {
            this.router.navigate(['/login']);
        }
    });
  }
}
