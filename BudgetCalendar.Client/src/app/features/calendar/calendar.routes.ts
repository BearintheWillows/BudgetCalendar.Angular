import { Route } from '@angular/router';
import { CalendarHomeComponent } from './calendar-home.component';

export const CALENDAR_ROUTES: Route[] = [
    {
        path: '', component: CalendarHomeComponent,
    },
];
