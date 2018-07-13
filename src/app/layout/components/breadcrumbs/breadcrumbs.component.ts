import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  IsAuthenticated: boolean;
  a: any;

  constructor(private serviceAuth: AuthService) {}

  ngOnInit() {

  }

  public IsAuth() {
    console.log('IsAuthenticated', this.IsAuthenticated);
    this.serviceAuth.isAuthenticated();
  }
}
