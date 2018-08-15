import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/states';
import { LogOut } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-user-log-off',
  templateUrl: './user-log-off.component.html',
  styleUrls: ['./user-log-off.component.css']
})
export class UserLogOffComponent implements OnInit {

  constructor(private serviceAuth: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
  }

 onLogout() {
    this.store.dispatch(new LogOut());
    this.router.navigate(['/login']);
  }

}
