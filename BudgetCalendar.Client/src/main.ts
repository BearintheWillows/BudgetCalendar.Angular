import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { JwtModule } from '@auth0/angular-jwt';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";

bootstrapApplication(AppComponent, {
    providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(
      BrowserAnimationsModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem('token');
            },
          allowedDomains: ['localhost:44381'],
        }
      }),
      DynamicDialogModule,
    ),
      provideHttpClient(
        withInterceptorsFromDi(),
      ),
    provideAnimations(),

]
})
  .catch(err => console.error(err));
