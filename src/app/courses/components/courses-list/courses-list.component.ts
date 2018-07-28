import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { CoursesListItem } from '../../models/courses-list-item.model';

@Component({
  selector: 'app-courses-list',
  //changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() searchText: string;
  // это свойство содержит название поля, по которому необходимо сортировать список курсов.
  sortField = 'createDate';
  // 1 - по алфавиту, -1 - в обратном порядке
  order = -1;
  input: string;
  id = 0;
  title: string;

  constructor() {}

  ngOnInit() {}

  onDelete(item: CoursesListItem) {
   this.deleteCourse.emit(item);
  }

  onEdit(item: CoursesListItem) {
    this.editCourse.emit(item);
  }

  onGetCourseById(item: CoursesListItem) {
   this.getbyId.emit(item);
  }
}
