import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
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

  public OnAuth() {
    if (this.login == 'test@gmail.com' && this.password == '1') {
      this.router.navigate(['landing-page']);
      this.IsAuthenticated = true;
    } else {
      alert('Invalid credentials.');
      this.IsAuthenticated = false;
      console.log('login', this.login);
      console.log('password', this.password);
    }
    this.OnLogin();
  }

  public OnLogin() {
    this.serviceAuth.login(this.fakeUsers);
  }

  public OnRetrieve() {
    this.serviceAuth.retrieveLocalStorage();
  }

  public OnGetUserInfo(login) {
    this.serviceAuth.getUserInfo();
  }

  public OnLogout() {
    this.serviceAuth.logout();
  }

  public IsAuth() {
    this.serviceAuth.isAuthenticated();
  }
}
