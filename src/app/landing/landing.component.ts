import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {CoursesListItemService} from '../courses/services/courses-list-item.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  searchText: string;
  newItem: any;

  constructor(private serviceAuth: AuthService,
              private coursesListService: CoursesListItemService) {
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

  onAddCourse() {
    this.coursesListService.addItem(this.newItem);
  }
}
