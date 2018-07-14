import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-user-log-off',
  templateUrl: './user-log-off.component.html',
  styleUrls: ['./user-log-off.component.css']
})
export class UserLogOffComponent implements OnInit{

  constructor(private serviceAuth: AuthService) { }

  ngOnInit() {
  }

  public OnClear() {
    this.serviceAuth.clear();
    console.log('User info was wiped: ');
  }

}
