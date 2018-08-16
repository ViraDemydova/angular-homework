import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/states';

@Component({
  selector: 'app-user-log-off',
  templateUrl: './user-log-off.component.html',
  styleUrls: ['./user-log-off.component.css']
})
export class UserLogOffComponent implements OnInit {

  constructor(
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
  }
}
