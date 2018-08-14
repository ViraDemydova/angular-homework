import {Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/services/loader.service';
import { UserEntityItem } from '../users/models/user-entity-item.model';
import { Subscription } from 'rxjs/Rx';
import { UserEntityItemService } from '../users/services/user-entity-item.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: UserEntityItem;
  login: string;
  password: string;
  private usersCreateSubscription: Subscription;

  constructor(
              private router: Router,
              private serviceAuth: AuthService,
              private loaderService: LoaderService,
              private userEntityService: UserEntityItemService) {}

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.usersCreateSubscription = this.userEntityService.checkCurrentUser().subscribe((res: UserEntityItem) => {
      this.user = res;
      //TODO: add check if user exists
      if (this.serviceAuth.getToken() === 'app_token') {
        this.router.navigate(['landing-page']);
      } else {
        return;
      }
    });
  }

  onLogin() {
    this.showLoader();
    this.serviceAuth.login(this.login, this.password)
      .subscribe(
        data => {
          if (this.login === this.user.login && this.password === this.user.password) {
            this.hideLoader();
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

  ngOnDestroy(): void {
    if (this.usersCreateSubscription) {
      this.usersCreateSubscription.unsubscribe();
    }
  }
}
