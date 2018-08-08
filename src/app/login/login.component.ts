import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  IsAuthenticated: boolean;
  currentUser: any;

  // Почему тут используется декоратор @Input()?
  // Он используется, если компонент получает что-то на вход.
  // В твоем случае этот компонент загружается роутером и ничего на вход не получает.
  @Input() login: string;
  @Input() password: string;

  constructor(
              private router: Router,
              private serviceAuth: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {}

  onLogin() {
    this.serviceAuth.login(this.login, this.password)
      .subscribe(
        data => {
          if (this.login === 'test@gmail.com' && this.password === '1') {
            this.router.navigate(['landing-page']);
          } else {
            return;
          }
        },
        error => {
          console.log('error');
          this.serviceAuth.logout();
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
