import { Injectable  } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public tokenKey = 'app_token';
  public IsAuthenticated: boolean;

  //login(content: string): boolean {
   // console.log('inside local storage store:', content, this.tokenKey);
    //localStorage.setItem(this.tokenKey, JSON.stringify(content));
   // console.log('status from login is:', this.IsAuthenticated);
    //return (this.IsAuthenticated = true);
  //}

  login(login: string, password: string) {
    return this.http.post<any>('http://localhost:3000/user', { login: login, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.tokenKey) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          return (this.IsAuthenticated = true);
        }

        return user;
      });
  }

  retrieveLocalStorage() {
    console.log('inside local storage store:');
    const storedToken = localStorage.getItem(this.tokenKey);
    console.log('storedToken:', storedToken);
    if (!storedToken) {
      throw new Error('no token found');
    }
    return storedToken;
  }

  logout() {
    //localStorage.clear();
    //location.reload();
    //this.IsAuthenticated = false;
    localStorage.removeItem('currentUser');
  }

  getUserInfo() {
    //const storedToken = localStorage.getItem(this.tokenKey);
    //const storedTokenParse = JSON.parse(storedToken);
    //const result = storedTokenParse.map(a => a.login);
    //console.log(result);
    return this.http.get('http://localhost:3000/user');
  }

  isAuthenticated(): boolean {
    if (this.IsAuthenticated) {
      console.log('user is Authenticated', this.IsAuthenticated);
      return true;
    } else {
      console.log('user is UNAuthenticated, failed to initialize!!!!', this.IsAuthenticated);
      return false;
    }
  }
}
