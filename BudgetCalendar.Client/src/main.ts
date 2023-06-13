import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";


bootstrapApplication(AppComponent, {
    providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideAnimations()
]
})
  .catch(err => console.error(err));
