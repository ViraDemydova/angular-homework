import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// Правильный путь rxjs
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public tokenKey = 'app_token';

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.tokenKey) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.tokenKey}`
        }
      });
    }

    return next.handle(request);
  }
}
