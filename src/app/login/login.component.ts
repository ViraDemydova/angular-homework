import {Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/services/loader.service';
import {UserEntityItem, UserModel} from '../users/models/user-entity-item.model';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import { AppState, selectAuthState } from '../core/store/states';
import { Login } from '../core/store/actions/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //user: UserEntityItem;
  user: UserEntityItem = new UserModel();
  getState: Observable<any>;
  errorMessage: string | null;
  private usersCreateSubscription: Subscription;

  constructor(
              private router: Router,
              private serviceAuth: AuthService,
              private loaderService: LoaderService,
              private store: Store<AppState>) {
    this.getState = this.store.pipe(select(selectAuthState));
  }

  ngOnInit() {
    //this.init();
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  onLogin(): void {
    //this.showLoader();
    const payload = {
      login: this.user.login,
      password: this.user.password,
    };
    this.store.dispatch(new Login(payload));
  }

  public onRetrieve() {
    this.serviceAuth.retrieveLocalStorage();
  }

  public onGetUserInfo(id) {
    this.serviceAuth.getUserInfo(id);
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

//  ngOnDestroy(): void {
   // if (this.usersCreateSubscription) {
   //   this.usersCreateSubscription.unsubscribe();
   // }
//  }
}
