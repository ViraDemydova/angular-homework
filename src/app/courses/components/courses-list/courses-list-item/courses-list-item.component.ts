import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { CoursesListItem } from '../../../models/courses-list-item.model';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit, OnChanges {
  @Input() public listItem: CoursesListItem;
  @Output() deleteCourse: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    console.log('onInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChange - data is: ', this.listItem.id);
  }

  onDelete(event) {
    this.deleteCourse.emit(this.listItem.id);
  }
}
