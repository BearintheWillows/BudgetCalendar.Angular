import {Route} from "@angular/router";
import {CalendarHomeComponent} from "../calendar/calendar-home.component";
import {AuthComponent} from "./auth.component";

export const AUTH_ROUTES: Route[] = [
  {
    path: '', component: AuthComponent,
  },
];
