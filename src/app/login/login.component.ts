import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import {LoaderService} from "../loader/services/loader.service";
import {SharedService} from "../core/services/shared.service";
import {UserEntityItem} from "../users/models/user-entity-item.model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser: UserEntityItem;
  login: string;
  password: string;
  user: any;

  constructor(
              private router: Router,
              private serviceAuth: AuthService,
              private sharedService: SharedService,
              private loaderService: LoaderService) {}

  ngOnInit() {}

  onLogin() {
    this.serviceAuth.login(this.login, this.password)
      .subscribe(
        data => {
          if (this.login === 'test@gmail.com' && this.password === '1') {
            this.showLoader();
            this.sharedService.publishData(this.login);
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

  public onGetUserInfo(id) {
    this.serviceAuth.getUserInfo(id);
  }

  public onLogout() {
    this.serviceAuth.logout();
  }

  public isAuth() {
    this.serviceAuth.isAuthenticated();
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }
}
