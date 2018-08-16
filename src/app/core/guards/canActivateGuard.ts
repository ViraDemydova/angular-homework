import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class CanActivateGuard implements CanActivate {
  constructor(private serviceAuth: AuthService,
              private router: Router,
              private sharedService: SharedService
  ) {}

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


