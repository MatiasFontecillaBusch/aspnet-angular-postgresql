import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from '../core/interceptors/error-interceptor';
import { jwtInterceptor } from '../core/interceptors/jwt-interceptor';
import { InitializationService } from '../core/services/initialization-service';
import { lastValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor])),
    provideAppInitializer(async () => {
      const initializationService = inject(InitializationService);

      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            return lastValueFrom(initializationService.init());
          } finally {
            const splash = document.getElementById('initial-splash');
            if (splash) splash.remove();
            resolve();
          }
        }, 1000);
      });
    }),
  ],
};
