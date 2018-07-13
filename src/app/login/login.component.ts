import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public fakeUsers: any;
  email: string;
  password: string;

  constructor(private router: Router,
              private serviceAuth: AuthService) {}

  ngOnInit() {
    this.fakeUsers = [
      {
        id: 1,
        login: 'login',
        email: 'test@gmail.com',
        password: '1'
      },
      {
        id: 2,
        login: 'login2',
        email: 'test@gmail.com',
        password: '1'
      }
    ];
  }

  public OnLogin() {
    if (this.email == 'test@gmail.com' && this.password == '1') {
      this.router.navigate(['landing-page']);
    } else {
      alert('Invalid credentials.');
      console.log('email', this.email);
      console.log('password', this.password);
    }
  }

  public OnStore() {
    this.serviceAuth.store(this.fakeUsers);
  }

  public OnRetrieve() {
    this.serviceAuth.retrieve();
  }

  public OnRetrieveId(login) {
    this.serviceAuth.retrieveId();
  }

  public OnClear() {
    this.serviceAuth.clear();
  }

  public IsAuth() {
    this.serviceAuth.isAuthenticated();
  }
}
