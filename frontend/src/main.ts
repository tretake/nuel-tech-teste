import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 

import { AuthInterceptor } from './app/services/auth/auth.interceptor'; 


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(), 
    provideRouter(routes) 
  ]
}).catch(err => console.error(err));

