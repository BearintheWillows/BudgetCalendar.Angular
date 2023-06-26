import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { JwtModule } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [
    provideHttpClient(),
    provideRouter(APP_ROUTES),
    importProvidersFrom(BrowserAnimationsModule, JwtModule.forRoot({
        config: {
            tokenGetter: () => {
                return localStorage.getItem('access_token');
            },
            allowedDomains: ['localhost:7031'],
            disallowedRoutes: []
        }
    })),
    provideAnimations(),
]
})
  .catch(err => console.error(err));
