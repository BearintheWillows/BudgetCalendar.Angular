import {Route} from "@angular/router";
import {CalendarHomeComponent} from "../calendar/calendar-home.component";
import {AccountComponent} from "./account.component";

export const ACCOUNT_ROUTES: Route[] = [
  {
    path: '', component: AccountComponent,
  },
];
