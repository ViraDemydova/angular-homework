import { Injectable } from '@angular/core';
import { CoreModule } from './../core.module';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  public tokenKey = 'app_token';
  public IsAuthenticated: boolean;

  // TODO: надо указать тип для этого параметра
  login(content) {
    console.log('inside local storage store:', content, this.tokenKey);
    localStorage.setItem(this.tokenKey, JSON.stringify(content));
    console.log('status from login is:', this.IsAuthenticated);
    return (this.IsAuthenticated = true);
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
    localStorage.clear();
    location.reload();
    this.IsAuthenticated = false;
  }

  getUserInfo() {
    const storedToken = localStorage.getItem(this.tokenKey);
    const storedTokenParse = JSON.parse(storedToken);
    const result = storedTokenParse.map(a => a.login);
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
