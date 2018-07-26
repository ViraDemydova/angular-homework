import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {CoursesListItem} from '../../../courses/models/courses-list-item.model';

@Component({
  selector: 'app-toolbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() addCourse: EventEmitter<CoursesListItem> = new EventEmitter<CoursesListItem>();

  // принимаем текст от search input
  // и передаем его родительскому компоненту
  onSearch(searchText: string) {
    this.search.emit(searchText);
  }
}
