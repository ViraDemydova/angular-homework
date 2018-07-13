import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private loginService: AuthService, private router: Router) { }

  ngOnInit() {}

  onLogin() {
    console.log ('logged in successfully', this.loginService.login());
    this.loginService.login();
    //this.deleteCourse.emit(this.listItem.id);
  }
}
