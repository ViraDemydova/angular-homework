import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { CoursesListItem } from '../../models/courses-list-item.model';
import { CoursesListItemService } from '../../services/courses-list-item.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnChanges {
  public ListItems: CoursesListItem[] = [];
  // это свойство содержит текст поиска курса по названию
  @Input() searchText: string;
  // это свойство содержит название поля, по которому необходимо сортировать список курсов.
  sortField = 'createDate';

  // 1 - по алфавиту, -1 - в обратном порядке
  order = -1;
  input: string;
  id = 0;

  constructor(private coursesListService: CoursesListItemService) {}

  ngOnInit() {
    this.ListItems = this.coursesListService.getCourseListItems();
    console.log(`ngOnInit - data is: '${this.ListItems}'\n`);
  }

  ngOnChanges() {
    console.log('CoursesListComponent: searchText:', this.searchText);
  }

  onDeleteCourse(item: CoursesListItem) {
    this.coursesListService.deleteItem(item);
    console.log('Cours with id: ', item.id, ' was deleted');
  }

  onEditCourse(item: CoursesListItem) {
    this.coursesListService.editItem(item);
    console.log('Cours with id: ', item.id, ' was edited');
  }

  onGetCourseById(item: CoursesListItem) {
    this.coursesListService.getCourseById(item.id);
    console.log('Getting object by ID, result as: ', this.coursesListService.getCourseById(item.id));
  }

  onHandleclick() {
    console.log('hey, I am a simple handler with console log\n');
  }
}
