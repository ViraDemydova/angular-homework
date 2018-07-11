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
   updatedItem: CoursesListItem;
   date3 = new Date('01.29.2019');

  constructor(private coursesListService: CoursesListItemService) { }

  ngOnInit() {
    this.creationDate = this.listItem.createDate;
    this.title = this.listItem.title;
    this.updatedItem = {
      id: 333,
      title: 'Update ',
      createDate: this.date3,
      duration: 59,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    };
    console.log('onInit');
    console.log('createionDate is: ', this.creationDate);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChange - data is: ', this.listItem.id);
  }

  onDelete(event) {
    this.coursesListService.deleteItem(this.listItem);
    //this.deleteCourse.emit(this.listItem.id);
  }

  onEdit(event) {
    this.coursesListService.editItem(this.updatedItem);
    //this.deleteCourse.emit(this.listItem.id);
  }
}
