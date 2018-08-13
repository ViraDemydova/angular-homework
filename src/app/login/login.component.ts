import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/services/loader.service';
import { SharedService } from '../core/services/shared.service';
import { UserEntityItem } from '../users/models/user-entity-item.model';
import { Subscription } from 'rxjs/Rx';
import { UserEntityItemService } from '../users/services/user-entity-item.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserEntityItem;
  login: string;
  password: string;

  constructor(
              private router: Router,
              private serviceAuth: AuthService,
              private loaderService: LoaderService,
              private userEntityService: UserEntityItemService) {}

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.userEntityService.checkCurrentUser().subscribe((res: UserEntityItem) => {
      this.user = res;
    });
  }

  onLogin() {
    this.serviceAuth.login(this.login, this.password)
      .subscribe(
        data => {
          if (this.login === this.user.login && this.password === this.user.password) {
            this.showLoader();
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
