import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Почему это свойство типа any?
  // Нужно создать модель для пользователя.
  // Возможно, логин и пароль будут входить в эту модель
  currentUser: any;
  login: string;
  password: string;

  constructor(private router: Router, private serviceAuth: AuthService) {}

  ngOnInit() {
    // В конструкторе не должно быть ничего, кроме внедрения зависимостей
    // Тут делаем инициализацию
    // Думаю, что логично было бы сделать так: если токен есть, то форму ввода
    // логина и пароля не показывать, пользователь же залогинился.
    // Делать переадресацию на главную страницу. Ну, а если токена нет,
    // то показывать страницу ввода логина
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onLogin() {
    this.serviceAuth.login(this.login, this.password).subscribe(
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
      }
    );
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
