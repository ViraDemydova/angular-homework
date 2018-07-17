import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CoursesListItem } from '../../../models/courses-list-item.model';
import { CoursesListItemService } from '../../../services/courses-list-item.service';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit, OnChanges {
  @Input() public listItem: CoursesListItem;
  // @Output() deleteCourse: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  deleteCourse: EventEmitter<CoursesListItem> = new EventEmitter<
    CoursesListItem
  >();

  creationDate: object;
  title: string;

  // Этот компонент является презентационным.
  // Он не должен внедрять сервисы и тем более делать изменения в данных
  constructor() {} // private coursesListService: CoursesListItemService

  ngOnInit() {
    this.creationDate = this.listItem.createDate;
    this.title = this.listItem.title;
  }

  ngOnChanges() {
    console.log('ngOnChange - data is: ', this.listItem.id);
  }

  onDelete(event) {
    if (
      confirm(
        'Are you sure to delete this course: ' +
          this.listItem.title +
          ' ' +
          this.listItem.id +
          '?'
      )
    ) {
      // Вместо того, чтобы что-то удалять,
      // тут надо сгенерить Output
      // this.coursesListService.deleteItem(this.listItem);
      this.deleteCourse.emit(this.listItem);
    }
  }

  onEdit(event) {
    // this.coursesListService.editItem();
    // this.deleteCourse.emit(this.listItem.id);
  }
}
