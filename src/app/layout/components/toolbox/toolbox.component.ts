import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import {CoursesListItemService} from '../../../courses/services/courses-list-item.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  date7 = new Date('02.01.2021');
  newItem =  {
    id: 1,
    title: 'New item ',
    createDate: this.date7,
    duration: 120,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    topRated: true
  };

  constructor(private coursesListService: CoursesListItemService) { }

  ngOnInit() {}

  onAddCourse() {
    this.coursesListService.addData(this.newItem);
  }

  // принимаем текст от search input
  // и передаем его родительскому компоненту
  onSearch(searchText: string) {
    this.search.emit(searchText);
  }


}
