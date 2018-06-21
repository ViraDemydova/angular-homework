import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CoursesListItem } from '../../../models/courses-list-item.model';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit {
  @Input() public listItem: CoursesListItem;
  @Input() id: number;
  @Output() changeCounter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  logText() {
    this.changeCounter.emit(console.log('VideoId is ' this.listItem.id));
  }
}
