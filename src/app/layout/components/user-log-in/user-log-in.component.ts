import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { SharedService } from '../../../core/services/shared.service';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.login = this.sharedService.user$;
  }

  public onLogin() {
    this.serviceAuth.logout();
    this.router.navigate(['/login']);
  }
}
