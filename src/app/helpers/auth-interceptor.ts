import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // TODO: replace tokenKey
  public tokenKey = 'app_token';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // TODO: replace tokenKey
    if (currentUser && this.tokenKey) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenKey}`
        }
      });
    }

    return next.handle(request);
  }
}
