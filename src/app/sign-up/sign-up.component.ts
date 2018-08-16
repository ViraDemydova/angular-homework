import { Component, OnInit } from '@angular/core';
import { UserEntityItem, UserModel } from '../users/models/user-entity-item.model';
import { Store } from '@ngrx/store';
import {AppState, selectAuthState} from '../store/states';
import { SignUp } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: UserEntityItem = new UserModel();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSignUp(): void {
    const payload = {
      login: this.user.login,
      password: this.user.password
    };
    this.store.dispatch(new SignUp(payload));
  }

}
