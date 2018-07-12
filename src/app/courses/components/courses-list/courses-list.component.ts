import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { CoursesListItem } from '../../models/courses-list-item.model';
import { CoursesListItemService } from '../../services/courses-list-item.service';
import { CommunicatorService } from '../../../service/communicator.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() searchText: string;

  ListItems: CoursesListItem[] = [];
  filterToggle: boolean;
  id = 0;
  input: string;

  private sub: Subscription;

  constructor(
    private coursesListService: CoursesListItemService,
    private communicatorService: CommunicatorService
  ) {}

  ngOnInit() {
    this.ListItems = this.coursesListService.getCourseListItems();
    // this.searchText = this.ListItems.title;
    console.log(`ngOnInit - data is: '${this.ListItems}'\n`);
    this.sub = this.communicatorService.channel2$.subscribe(data =>
      this.submit()
    );
  }

  ngOnChanges() {
    console.log('CoursesListComponent:: serchText:', this.searchText);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChangeId(event) {
    console.log((this.id = event));
  }

  onHandleclick() {
    console.log('hey, I am a simple handler with console log\n');
  }

  submit() {
    this.filterToggle = !this.filterToggle;
  }
}
