import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';


@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor(private serviceAuth: AuthService,
              private router: Router) {}

  IsAuth() {
    console.log('IsAuthenticated from guard:', this.serviceAuth.isAuthenticated());
    return this.serviceAuth.isAuthenticated();
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.IsAuth()) {
      return true;
    } else {
      this.serviceAuth.logout();
      this.router.navigate(['/login']);
    }
  }
}
