import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  email: string;
  password: string;
  private channel = new Subject<any>();

  public channel1$ = this.channel.asObservable();

  constructor(private router: Router) { }

  // Service message commands
  publishData(data: any) {
    this.channel.next(this.login());
  }

  public login() {
    if (this.email === 'test@mail.ru' && this.password === '1') {
      this.router.navigate(['landing-page']);
    } else {
      alert('Invalid credentials.');
    }
  }

}
