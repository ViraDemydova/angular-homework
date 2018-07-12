import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { CoursesListItem } from '../../models/courses-list-item.model';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CommunicatorService } from '../../../service/communicator.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  // это свойство содержит текст поиска курса по названию
  @Input() searchText: string;
  // это свойство содержит название поля, по которому необходимо сортировать список курсов.
  sortField = 'createDate';
  // 1 - по алфавиту, -1 - в обратном порядке
  order = -1;

  ListItems: CoursesListItem[] = [];
  id = 0;
  input: string;

  constructor(private coursesListService: CoursesListItemService) {}

  ngOnInit() {
    this.ListItems = this.coursesListService.getCourseListItems();
    console.log(`ngOnInit - data is: '${this.ListItems}'\n`);
  }

  onChangeId(event) {
    console.log((this.id = event));
  }

  onHandleclick() {
    console.log('hey, I am a simple handler with console log\n');
  }
}
