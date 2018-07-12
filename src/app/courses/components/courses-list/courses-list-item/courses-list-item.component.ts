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
   creationDate: any;
  @Input() searchText: string;

  constructor() { }

  ngOnInit() {
    this.creationDate = this.listItem.createDate;
    console.log('onInit');
    console.log('createionDate is: ', this.creationDate);
  }

  ngOnChanges() {
    console.log('ngOnChange - data is: ', this.listItem.id);
    console.log('courses Item: searchText:', this.searchText);

  }

  onDelete(event) {
    this.deleteCourse.emit(this.listItem.id);
  }
}
