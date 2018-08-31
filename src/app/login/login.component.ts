import {Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { LoaderService } from '../loader/services/loader.service';
import {UserEntityItem, UserModel} from '../users/models/user-entity-item.model';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import { AppState, selectAuthState } from '../core/store/states';
import { Login } from '../core/store/actions/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserEntityItem = new UserModel();
  getState: Observable<any>;
  errorMessage: string | null;
  loginForm: FormGroup;
  private usersCreateSubscription: Subscription;

  constructor(
              private serviceAuth: AuthService,
              private loaderService: LoaderService,
              private store: Store<AppState>,
              private formBuilder: FormBuilder) {
    this.getState = this.store.pipe(select(selectAuthState));
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['',  [Validators.required, Validators.maxLength(30)]],
      password: ['',  [Validators.required, Validators.maxLength(10)]]
    });

    //this.init();
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  get g() { return this.loginForm.controls; }

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
