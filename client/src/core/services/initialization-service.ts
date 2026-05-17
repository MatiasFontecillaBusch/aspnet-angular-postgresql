import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from './authentication-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitializationService {
  private authenticationService = inject(AuthenticationService);

  init(): Observable<null> {
    this.authenticationService.getFromLocalStorageAndSetUser();

    return of(null);
  }
}
