import { Injectable  } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public IsAuthenticated: boolean;


  login(login: string, password: string) {
    return this.http.post<any>('http://localhost:3000/user', { login: login, password: password , tokenKey: 'app_token'})
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.tokenKey) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user && (this.IsAuthenticated = true);
      });
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
      console.log('user is UNAuthenticated, failed to initialize!!!!', this.IsAuthenticated);
      return false;
    }
  }
}
