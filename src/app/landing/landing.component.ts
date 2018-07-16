import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  searchText: string;

  constructor(private serviceAuth: AuthService) {
  }

  ngOnInit() {}

  // получаем текст поиска
  onSearch(searchText: string) {
    this.searchText = searchText;
    console.log('show search text from app', this.searchText);
  }

  IsAuth() {
    console.log('IsAuthenticated from landing page:', this.serviceAuth.isAuthenticated());
    return this.serviceAuth.isAuthenticated();
  }
}
