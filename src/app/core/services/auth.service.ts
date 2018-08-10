import { Injectable  } from '@angular/core';
import { CoreModule } from '../core.module';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { LoaderService } from '../../loader/services/loader.service';

const  BASE_URL = 'http://localhost:3000/user';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  authTokenNew = 'new_auth_token';
  currentToken: string;
  isUserAuthenticated: boolean;

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
  ) {
    this.currentToken = 'stale_auth_token';
  }

  getAuthToken() {
    return this.currentToken;
  }

  refreshToken(): Observable<string> {
    this.currentToken = this.authTokenNew;
    return of(this.authTokenNew).pipe(delay(200));
  }


  login(login: string, password: string) {
    return this.http.get<any>('http://localhost:3000/user')
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.tokenKey) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        // TODO: Такой код плохо читается
        return user && (this.isUserAuthenticated = true);
      }));
  }

  retrieveLocalStorage() {
    const storedToken = localStorage.getItem('currentUser');
    if (!storedToken) {
      throw new Error('no token found');
    }
    return storedToken;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isUserAuthenticated = false;
  }

  getUserInfo(login: string) {
    const result = this.http.get<string>(`${BASE_URL}`, {params: {login}});
    console.log(result);
  }

  isAuthenticated(): boolean {
    if (this.isUserAuthenticated) {
      console.log('user is Authenticated', this.isUserAuthenticated);
      return true;
    } else {
      console.log('user is UNAuthenticated, failed to initialize!!!!', this.isUserAuthenticated);
      return false;
    }
  }
}
