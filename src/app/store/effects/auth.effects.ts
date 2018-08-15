import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Observable } from 'rxjs';
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
import {catchError, map, switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  Login: Observable<any> = this.actions
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
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigate(['landing-page']);
    })
  );

  @Effect({ dispatch: false })
  LoginFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions
    .pipe (
      ofType(AuthActionTypes.SIGNUP),
      map((action: SignUp) => action.payload),
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
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );



}
