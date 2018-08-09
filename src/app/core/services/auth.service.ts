import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
// Этого не надо, если есть импорт { map }
// import 'rxjs/add/operator/map';
import { delay, map } from 'rxjs/operators';
// import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  public authTokenStale = 'stale_auth_token';
  public authTokenNew = 'new_auth_token';
  public currentToken: string;

  constructor(private http: HttpClient) {
    // Зачем эта строчка? Можно ведь сразу при объявлении currentToken
    // проинициализировать правильным значением
    this.currentToken = this.authTokenStale;
  }

  // Почемы это свойство ниже конструктора, а не со всеми остальными свойствами
  // Не нужно использовать public. Свойства по умолчанию public
  // Свойства называем с маленькой буквы
  public IsAuthenticated: boolean;

  getAuthToken() {
    return this.currentToken;
  }

  refreshToken(): Observable<string> {
    this.currentToken = this.authTokenNew;
    return of(this.authTokenNew).pipe(delay(200));
  }

  login(login: string, password: string) {
    return this.http.get<any>('http://localhost:3000/user').pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.tokenKey) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        // Такой код плохо читается
        return user && (this.IsAuthenticated = true);
      })
    );
  }

  retrieveLocalStorage() {
    const storedToken = localStorage.getItem('currentUser');
    // Постарайся минимально выводить информацию в консоль
    // Или после дебага, ее просто убирать. Очень много всего в консоле
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

  // Не понял, для чего этот метод
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
