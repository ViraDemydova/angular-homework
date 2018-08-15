import {Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/services/loader.service';
import {UserEntityItem, UserModel} from '../users/models/user-entity-item.model';
import {Observable, Subscription} from 'rxjs';
import { UserEntityItemService } from '../users/services/user-entity-item.service';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers/auth.reducers';
import { Login } from '../store/actions/auth.actions';
import { AppState, selectAuthState } from '../store/states';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //user: UserEntityItem;
  user: UserEntityItem = new UserModel();
  login: string;
  password: string;
  getState: Observable<any>;
  errorMessage: string | null;
  private usersCreateSubscription: Subscription;

  constructor(
              private router: Router,
              private serviceAuth: AuthService,
              private loaderService: LoaderService,
              private userEntityService: UserEntityItemService,
              private store: Store<State>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    //this.init();
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  init(): void {
    //this.usersCreateSubscription = this.userEntityService.checkCurrentUser().subscribe((res: UserEntityItem) => {
     // this.user = res;
      //TODO: add check if user exists
     // if (this.serviceAuth.getToken() === 'app_token') {
     //   this.router.navigate(['landing-page']);
    //  } else {
     //   return;
    //  }
   // });
  }

  //onLogin() {
  //  this.showLoader();
   // const payload = {
   //   login: this.user.login,
  //    password: this.user.password
   // };
    //this.serviceAuth.login(this.login, this.password)
   //   .subscribe(
      //  data => {
       //   if (this.login === payload.login && this.password === payload.password) {
       //     this.hideLoader();
        //    this.router.navigate(['landing-page']);
         // } else {
         //   return;
          //}
       // },
       // error => {
       //   console.log('error');
       //   this.serviceAuth.logout();
       // });
       // this.store.dispatch(new Login(payload));
  //}

  onLogin() {
    //this.showLoader();
    const payload = {
      login: this.user.login,
      password: this.user.password
    };
    this.store.dispatch(new Login(payload));
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

//  ngOnDestroy(): void {
   // if (this.usersCreateSubscription) {
   //   this.usersCreateSubscription.unsubscribe();
   // }
//  }
}
