import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public tokenKey = 'app_token';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && this.tokenKey) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.tokenKey}`
        }
      });
    }

    return next.handle(request);
  }
}
