import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CoursesListItem } from '../../models/courses-list-item.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  // Не нужно свойства называть с большой буквы.
  // Только классы и функции конструкторы называют с большой буквы.

  @Input() public ListItems: CoursesListItem[] = [];
  // У этого компонента <app-courses-list [ListItems]="ListItems"
  // (deleteCourse)="onDeleteCourse($event)">
  // только один инпут и один аутпут
  @Input() public listItem: CoursesListItem;

  // Зачем тут такое количество Output?
  @Output()
  deleteCourse: EventEmitter<CoursesListItem> = new EventEmitter<
    CoursesListItem
  >();
  @Output()
  editCourse: EventEmitter<CoursesListItem> = new EventEmitter<
    CoursesListItem
  >();
  @Output()
  getbyId: EventEmitter<CoursesListItem> = new EventEmitter<CoursesListItem>();
  @Output() id;

  // Эти поля, по моему, не используются
  input: string;
  title: string;

  constructor() {}

  ngOnInit() {}

  onDelete(id) {
    this.deleteCourse.emit(id);
  }
}
