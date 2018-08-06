import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  IsAuthenticated: boolean;
  currentUser: any;
  @Input() login: string;
  @Input() password: string;

  constructor(private router: Router,
              private serviceAuth: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {}

  onLogin() {
    this.serviceAuth.login(this.login, this.password)
      .subscribe(
        data => {
          this.router.navigate(['landing-page']);
          this.IsAuthenticated = true;
        },
        error => {
          console.log('error');
          this.IsAuthenticated = false;
        });
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
