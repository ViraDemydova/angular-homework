import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.email === 'vera.demidova@gmail.com' && this.password === '1') {
      this.router.navigate(['landing-page']);
    } else {
      alert('Invalid credentials.');
    }
  }
}
