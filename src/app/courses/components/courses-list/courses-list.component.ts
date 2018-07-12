import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { Subscription } from 'rxjs';

import { CoursesListItem } from '../../models/courses-list-item.model';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import {FilterPipe} from '../../../shared/pipes/filter.pipe';
import {OrderByPipe} from "../../../shared/pipes/orderBy.pipe";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [
    FilterPipe
  ]
})
export class CoursesListComponent implements OnInit, OnChanges {
  public ListItems: CoursesListItem[] = [];
  @Input() searchText: string;
  id = 0;

  constructor(private coursesListService: CoursesListItemService) {}

  ngOnInit() {
    this.ListItems = this.coursesListService.getCourseListItems();
  }

  ngOnChanges() {
     console.log('CoursesListComponent: searchText:', this.searchText);
  }

  onChangeId(event) {
    console.log(this.id = event);
  }

  onHandleclick() {
    console.log('hey, I am a simple handler with console log\n');
  }
}
