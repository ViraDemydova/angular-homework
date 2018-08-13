import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class CanActivateGuard implements CanActivate {
  constructor(private serviceAuth: AuthService,
              private router: Router,
              private sharedService: SharedService
  ) {}

  IsAuth() {
    console.log('IsAuthenticated from guard:', this.serviceAuth.isAuthenticated());
    return this.serviceAuth.isAuthenticated();
  }

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean {
   // if (this.IsAuth()) {
    //  return true;
    // } else {
    //  this.router.navigate(['/login']);
   // }
  // }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.sharedService.user$
        .pipe(map(user => {
          if (user) {
            return true;
          }
        }),
         catchError(() => {
          return Observable.of(false);
        }));
    }
}


