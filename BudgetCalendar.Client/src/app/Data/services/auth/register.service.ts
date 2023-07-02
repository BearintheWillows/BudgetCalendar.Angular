import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthPaths} from "../../types/api/api-paths.constants";
import {IRegistrationResponse} from "../../types/auth/iRegistrationResponse.dto";
import {IUserForRegistration} from "../../types/auth/iUserForRegistration.dto";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpClient = inject(HttpClient);
  public register = (body: IUserForRegistration) => {
    return this.httpClient.post<IRegistrationResponse>(`${AuthPaths.Register}`, body)
  }


}
