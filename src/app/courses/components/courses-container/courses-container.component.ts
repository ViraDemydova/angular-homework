import {Component, OnChanges, OnInit, Input} from '@angular/core';
import {CoursesListItemService} from '../../services/courses-list-item.service';
import {CoursesListItem} from '../../models/courses-list-item.model';

@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.css']
})
export class CoursesContainerComponent implements OnInit, OnChanges {
  ListItems: CoursesListItem[];
  @Input() public listItem: CoursesListItem;
  // это свойство содержит текст поиска курса по названию
  @Input() searchText: string;
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
