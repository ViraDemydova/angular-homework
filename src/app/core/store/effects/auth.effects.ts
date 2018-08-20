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

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // Рекоммендую называть эффекты так login$
  @Effect()
  Login: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    // Еще можно использовать pluck вместо map
    map((action: Login) => action.payload),
    switchMap(payload => {
      return this.authService.login(payload.login, payload.password).pipe(
        map(user => {
          return new LoginSuccess({ token: user.token, login: payload.login });
        }),
        catchError(error => {
          return of(new LoginFailure({ error: error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigate(['landing-page']);
    })
  );

  // Зачем этот эффект? Он ничего не делает.
  @Effect({ dispatch: false })
  LoginFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload.login, payload.password).pipe(
        map(user => {
          return new SignUpSuccess({ token: user.token, login: payload.login });
        }),
        catchError(error => {
          return of(new SignUpFailure({ error: error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap(user => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigate(['landing-page']);
    })
  );

  // Эффект не нужен
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
