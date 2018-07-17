import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public fakeUsers: any;
  login: string;
  password: string;
  IsAuthenticated: boolean;

  constructor(private router: Router,
              private serviceAuth: AuthService) {}

  ngOnInit() {
    this.fakeUsers = [
      {
        id: 1,
        login: 'test@gmail.com',
        password: '1'
      }
    ];
  }

  public onAuth() {
    if (this.login === 'test@gmail.com' && this.password === '1') {
      this.router.navigate(['landing-page']);
      this.IsAuthenticated = true;
    } else {
      alert('Invalid credentials.');
      this.IsAuthenticated = false;
      console.log('login', this.login);
      console.log('password', this.password);
    }
    this.onLogin();
  }

  public onLogin() {
    this.serviceAuth.login(this.fakeUsers);
  }

  public onRetrieve() {
    this.serviceAuth.retrieveLocalStorage();
  }

  public onGetUserInfo(login) {
    this.serviceAuth.getUserInfo();
  }

  public onLogout() {
    this.serviceAuth.logout();
  }

  public isAuth() {
    this.serviceAuth.isAuthenticated();
  }
}
