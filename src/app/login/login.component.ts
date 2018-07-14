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
  login: string;
  password: string;

  //объявляем переменную
  @Input() IsAuthenticated: boolean;
  // передаем статус наверх в виде строки
  @Output() status: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  public OnLogin() {
    if (this.login == 'test@gmail.com' && this.password == '1') {
      this.router.navigate(['landing-page']);
      this.IsAuthenticated = true;
    } else {
      alert('Invalid credentials.');
      this.IsAuthenticated = false;
      console.log('login', this.login);
      console.log('password', this.password);
    }
    this.OnStore();
  }

  public OnStore() {
    this.serviceAuth.store(this.fakeUsers);
    console.log('status is:', this.IsAuthenticated);
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
    console.log('from login status is:', this.IsAuthenticated);
    this.serviceAuth.isAuthenticated();
  }
}
