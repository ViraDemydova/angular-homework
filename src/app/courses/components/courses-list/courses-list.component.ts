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

  // это свойство содержит текст поиска курса по названию
  //@Input() searchText: string;
  // это свойство содержит название поля, по которому необходимо сортировать список курсов.
  sortField = 'createDate';
  // 1 - по алфавиту, -1 - в обратном порядке
  order = -1;
  input: string;
  title: string;
  @Output() id;

  constructor() {}

  ngOnInit() {}

  onDelete(id) {
   console.log('222222222222222222222222222222222222222: ', id);
   this.deleteCourse.emit(id);
  }

  onEdit(item: CoursesListItem) {
    this.editCourse.emit(item);
  }

  onGetCourseById(item: CoursesListItem) {
   this.getbyId.emit(item);
  }
}
