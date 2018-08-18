import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/shared.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/store/states';
import { LogOut } from '../../../core/store/actions/auth.actions';

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {
  login: Observable<string>;

  constructor(
    private serviceAuth: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private store: Store<AppState>) {}

  ngOnInit() {
    //this.sub = this.sharedService.user$.subscribe(user => this.login = user);
    this.login = this.sharedService.user$;
  }

  public onLogin() {
    this.store.dispatch(new LogOut());
    this.router.navigate(['/login']);
  }

  onLogout(): void {
    this.store.dispatch(new LogOut());
  }
}
