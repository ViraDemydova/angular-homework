import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { CoursesListItem } from '../../../models/courses-list-item.model';
import {CoursesListItemService} from "../../../services/courses-list-item.service";

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit, OnChanges {
  @Input() public listItem: CoursesListItem;
  @Output() deleteCourse: EventEmitter<number> = new EventEmitter<number>();
   creationDate: any;
   title: string;

  constructor(private coursesListService: CoursesListItemService) { }

  ngOnInit() {
    this.creationDate = this.listItem.createDate;
    this.title = this.listItem.title;
    console.log('onInit');
    console.log('createionDate is: ', this.creationDate);
  }

  ngOnChanges() {
    console.log('ngOnChange - data is: ', this.listItem.id);
  }

  onDelete(event) {
    if (confirm("Are you sure to delete this course: " + this.listItem.title + " " + this.listItem.id + "?" )) {
      this.coursesListService.deleteItem(this.listItem);
    }
    this.deleteCourse.emit(this.listItem.id);
  }

  onEdit(event) {
    this.coursesListService.editItem();
    //this.deleteCourse.emit(this.listItem.id);
  }
}
