import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {

  constructor(
    private serviceAuth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  public onLogin() {
    this.serviceAuth.logout();
    this.router.navigate(['/login']);
  }
}
