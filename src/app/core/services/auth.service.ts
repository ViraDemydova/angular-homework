import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient } from '@angular/common/http';
// Rxjs поддерживает два пути для импорта 'rxjs', 'rxjs/operators'
import { Observable, of } from 'rxjs'; // 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  public authTokenStale = 'stale_auth_token';
  public authTokenNew = 'new_auth_token';
  public currentToken: string;

  constructor(private http: HttpClient) {
    this.currentToken = this.authTokenStale;
  }

  public IsAuthenticated: boolean;

  getAuthToken() {
    return this.currentToken;
  }

  refreshToken(): Observable<string> {
    this.currentToken = this.authTokenNew;
    // Это старый способ
    // return Observable.of(this.authTokenNew).delay(200);
    // Это новый способ
    return of(this.authTokenNew).pipe(delay(200));
  }

  login(login: string, password: string) {
    // Почему тут post запрос?
    // Он используется, если надо что-то сохранить на сервер.
    // Тебе же надо получить информацию о пользователе из json файла - это get запрос.
    return (
      this.http
        .post<any>('http://localhost:3000/user', {
          login: login,
          password: password,
          tokenKey: this.authTokenStale
        })
        // Это старый способ. Новый способ это использовать .pipe(map(fn))
        .map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.tokenKey) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }

          return user && (this.IsAuthenticated = true);
        })
    );
  }

  retrieveLocalStorage() {
    const storedToken = localStorage.getItem('currentUser');
    console.log('Current user is:', storedToken);
    if (!storedToken) {
      throw new Error('no token found');
    }
    return storedToken;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.IsAuthenticated = false;
  }

  getUserInfo() {
    console.log('user info', this.http.get('http://localhost:3000/user'));
    const result = this.http.get('http://localhost:3000/user');
    console.log(result);
  }

  isAuthenticated(): boolean {
    if (this.IsAuthenticated) {
      console.log('user is Authenticated', this.IsAuthenticated);
      return true;
    } else {
      console.log(
        'user is UNAuthenticated, failed to initialize!!!!',
        this.IsAuthenticated
      );
      return false;
    }
  }
}
