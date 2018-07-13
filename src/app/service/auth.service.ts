import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public tokenKey = 'app_token';
  public IsAuthenticated: boolean;

  constructor() {
  }


  store(content) {
    console.log('inside local storage store:', content, this.tokenKey);
    localStorage.setItem(this.tokenKey, JSON.stringify(content));
    return this.IsAuthenticated = true;
  }

  retrieve() {
    console.log('inside local storage store');
    let storedToken = localStorage.getItem(this.tokenKey);
    console.log('storedToken:', storedToken);
    if (!storedToken) {
      throw 'no token found';
    }
    return storedToken;
  }

  clear() {
    localStorage.clear();
    location.reload();
    this.IsAuthenticated = false;
    console.log('inside local storage store:', this.tokenKey);
    console.log('IsAuthenticated:', this.IsAuthenticated);
  }

  retrieveId() {
    let storedToken = localStorage.getItem(this.tokenKey);
    let storedTokenParse = JSON.parse(storedToken);
    let result = storedTokenParse.map(a => a.login);
    console.log(result);
  }

  isAuthenticated(): boolean {
    if (this.IsAuthenticated) {
      console.log('user is Authenticated');
      return true;
    } else {
      console.log('user is UNAuthenticated, failed to initializ!!!!');
      return false;
    }
  }
}
