import { Route } from '@angular/router';
import {CalendarBudgetsMobileComponent} from "./pages/calendar-budgets-mobile/calendar-budgets-mobile.component";
import {CalendarHomeComponent} from "./pages/calendar-home/calendar-home.component";

export const CALENDAR_ROUTES: Route[] = [
    {
      path: '', component: CalendarHomeComponent,
    },
  {
    path: 'day/:date/detail', component: CalendarBudgetsMobileComponent,
  }
];
