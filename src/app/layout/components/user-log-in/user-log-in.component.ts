import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../core/services/shared.service';
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {
  login: string;
  private usersCreateSubscription: Subscription;

  constructor(
    private serviceAuth: AuthService,
    private sharedService: SharedService,
    private router: Router) {}

  ngOnInit() {
    this.sharedService.user$.subscribe(user => this.login = user);
  }

  public onLogin() {
    this.serviceAuth.logout();
    this.router.navigate(['/login']);
  }
}
