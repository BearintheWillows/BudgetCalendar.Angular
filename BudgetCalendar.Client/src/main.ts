import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';


bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(BrowserModule),
      provideRouter(APP_ROUTES),
    ]
})
  .catch(err => console.error(err));