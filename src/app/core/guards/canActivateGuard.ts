import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: CoreModule
})
export class CanActivateGuard implements CanActivate {
  constructor(
    private serviceAuth: AuthService,
    private sharedService: SharedService
  ) {}

  IsAuth() {
    console.log(
      'IsAuthenticated from guard:',
      this.serviceAuth.isAuthenticated()
    );
    return this.serviceAuth.isAuthenticated();
  }

  canActivate(): Observable<boolean> {
    return this.sharedService.user$.pipe(
      map(user => {
        if (user) {
          return true;
        }
      }),
      catchError(() => {
        return Observable.of(false);
      })
    );
  }
}
