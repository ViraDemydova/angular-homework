import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private serviceAuth: AuthService) {
  }

  ngOnInit() {
  }

  IsAuth() {
    console.log('IsAuthenticated from landing page:', this.serviceAuth.isAuthenticated());
    return this.serviceAuth.isAuthenticated();
  }
}
