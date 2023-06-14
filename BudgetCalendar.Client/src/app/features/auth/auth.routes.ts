import {Route} from "@angular/router";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import { AuthComponent } from "./auth.component";

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login', component: AuthComponent,
  },
  {
    path: 'register', component: AuthComponent,
  }
];
