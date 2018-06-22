import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { CoursesListItem } from '../../../models/courses-list-item.model';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit, OnChanges {
  @Input() public listItem: CoursesListItem;
  @Input() id: number;
  @Output() changeCounter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log('onInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChange - data is: ', this.listItem.id);
  }

  logText() {
    this.changeCounter.emit(console.log('VideoId is: ', this.listItem.id));
  }
}
