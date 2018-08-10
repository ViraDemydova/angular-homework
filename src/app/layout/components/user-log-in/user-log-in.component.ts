import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {
  a: any;
  user: any;
  // create observable
  simpleObservable = new Observable((observer) => {
    // observable execution
    observer.next(this.serviceAuth.getUserInfo());
    observer.complete();
  });


  constructor(
    private serviceAuth: AuthService,
    private router: Router) { }

  ngOnInit() {
    // subscribe to the observable
    this.a = this.simpleObservable.subscribe((data) => {
      console.log(data); // should be 'data to send can be object or anything'
    });
  }

  public onLogin() {
    this.serviceAuth.logout();
    this.router.navigate(['/login']);
  }

  public onGetUserInfo(login) {
    this.serviceAuth.getUserInfo(login);
  }

}
