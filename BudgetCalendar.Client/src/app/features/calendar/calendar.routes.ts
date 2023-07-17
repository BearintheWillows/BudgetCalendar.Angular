import { Route } from '@angular/router';
import {CalendarHomeComponent} from "./pages/calendar-home/calendar-home.component";
import {
  CalendarDayDetailMobileComponent
} from "./pages/calendar-day-detail-mobile/calendar-day-detail-mobile.component";

export const CALENDAR_ROUTES: Route[] = [
    {
      path: '', component: CalendarHomeComponent,
    },
  {
    path: 'day/:date/detail', component: CalendarDayDetailMobileComponent,
  }
];
