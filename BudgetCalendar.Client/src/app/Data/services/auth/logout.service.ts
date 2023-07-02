import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  router = inject(Router);
  logout = () => {
    localStorage.removeItem("token");
    this.router.navigate(["/auth/login"]);
  }
}
