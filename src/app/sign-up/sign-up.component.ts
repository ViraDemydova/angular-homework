import { Component, OnInit } from '@angular/core';
import { UserEntityItem, UserModel } from '../users/models/user-entity-item.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../core/store/states';
import { SignUp } from '../core/store/actions/auth.actions';

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
