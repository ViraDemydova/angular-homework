import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CoursesListItem } from '../../models/courses-list-item.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @Input()  public ListItems: CoursesListItem[] = [];
  @Input() public listItem: CoursesListItem;
  @Output() deleteCourse: EventEmitter<CoursesListItem> = new EventEmitter<CoursesListItem>();
  @Output() editCourse: EventEmitter<CoursesListItem> = new EventEmitter<CoursesListItem>();
  @Output() getbyId: EventEmitter<CoursesListItem> = new EventEmitter<CoursesListItem>();
  @Output() id;
  input: string;
  title: string;

  constructor() {}

  ngOnInit() {}

  onDelete(id) {
   this.deleteCourse.emit(id);
  }
}
