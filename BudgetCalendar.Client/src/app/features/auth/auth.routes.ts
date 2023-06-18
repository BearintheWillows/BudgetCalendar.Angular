import {Route} from "@angular/router";
import { AuthComponent } from "./auth.component";
import { RegisterConfirmComponent } from "./Pages/register-confirm/register-confirm.component";

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login', component: AuthComponent,
  },
  {
    path: 'register', component: AuthComponent,
  },
  {
    path: 'register-confirm', component: RegisterConfirmComponent
  }
];
