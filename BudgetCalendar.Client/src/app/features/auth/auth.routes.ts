import {Route} from "@angular/router";
import {LoginFormComponent} from "./components/login-form/login-form.component";

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login', component: LoginFormComponent,
  },
];
