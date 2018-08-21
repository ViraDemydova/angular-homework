import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  LogOut
} from '../actions/auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UserEntityItem } from '../../../users/models/user-entity-item.model';


@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  Login: Observable<UserEntityItem> = this.actions
    .pipe (
      ofType(AuthActionTypes.LOGIN),
      map((action: Login) => action.payload),
      switchMap(payload => {
        return this.authService.login(payload.login, payload.password)
          .pipe (
            map((user) => {
              return new LoginSuccess({token: user.token, login: payload.login});
            }),
            catchError((error) => {
              return Observable.of(new LoginFailure({ error: error }));
            })
          );
      })
    );

  @Effect({ dispatch: false })
  LoginSuccess: Observable<UserEntityItem> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigate(['landing-page']);
    })
  );
  // TODO: remove. useless effect
  @Effect({ dispatch: false })
  LoginFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<UserEntityItem> = this.actions
    .pipe (
      ofType(AuthActionTypes.SIGNUP),
      map((action: SignUp) => action.payload),
      switchMap(payload => {
        return this.authService.signUp(payload.login, payload.password)
          .pipe (
            map((user) => {
              return new SignUpSuccess({token: user.token, login: payload.login});
            }),
            catchError((error) => {
              return Observable.of(new SignUpFailure({ error: error }));
            })
          );
      })
    );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<UserEntityItem> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap(user => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigate(['landing-page']);
    })
  );

  // TODO: remove. useless effect
  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(user => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
  );



}
