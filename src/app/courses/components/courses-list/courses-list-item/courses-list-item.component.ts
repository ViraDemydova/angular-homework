import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { CoursesListItem } from '../../../models/courses-list-item.model';
import { CoursesListItemService } from '../../../services/courses-list-item.service';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit, OnChanges {
  @Input() public listItem: CoursesListItem;
  @Output() deleteCourse: EventEmitter<number> = new EventEmitter<number>();
   currentDate = new Date();
   creationDate: any;

  constructor() { }

  ngOnInit() {
    this.creationDate = this.listItem.createDate;
    console.log('onInit');
    console.log('createDate: ', this.creationDate);
    console.log(this.currentDate);
    console.log(this.creationDate);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChange - data is: ', this.listItem.id);
  }

  onDelete(event) {
    this.deleteCourse.emit(this.listItem.id);
  }
}
