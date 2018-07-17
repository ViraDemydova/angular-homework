import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-log-off',
  templateUrl: './user-log-off.component.html',
  styleUrls: ['./user-log-off.component.css']
})
export class UserLogOffComponent implements OnInit {

  constructor(private serviceAuth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public onLogout() {
    this.serviceAuth.logout();
    this.router.navigate(['/login']);
    console.log('User info was wiped: ');
  }

}
