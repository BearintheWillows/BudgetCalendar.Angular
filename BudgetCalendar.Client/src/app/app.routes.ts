import { Routes } from '@angular/router';
import { AuthGuard } from './shared/_guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'calendar',
    loadChildren: () => import('./features/calendar/calendar.routes').then(m => m.CALENDAR_ROUTES),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  // { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];
