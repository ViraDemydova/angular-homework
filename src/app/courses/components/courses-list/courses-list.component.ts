import { Component, OnInit } from '@angular/core';
import { CoursesListItem } from '../../models/courses-list-item.model';
import { CoursesListItemService } from '../../services/courses-list-item.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public ListItems: CoursesListItem[] = [];

  constructor(private coursesListService: CoursesListItemService) { }

  ngOnInit() {
    this.ListItems = this.coursesListService.getCourseListItems();
  }

}
