import { Component, Output, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {CoursesListItem} from '../../../courses/models/courses-list-item.model';

@Component({
  selector: 'app-toolbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() addCourse: EventEmitter<CoursesListItem> = new EventEmitter<CoursesListItem>();
  newItem: any;

  constructor() { }

  ngOnInit() {}

  //onAddCourse() {
    //this.coursesListService.addItem(this.newItem);
 // }

  // принимаем текст от search input
  // и передаем его родительскому компоненту
  onSearch(searchText: string) {
    this.search.emit(searchText);
  }

  onAddCourse(event) {
    this.addCourse.emit(this.newItem);
  }
}
