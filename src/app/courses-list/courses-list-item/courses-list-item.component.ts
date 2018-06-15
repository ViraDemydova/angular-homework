import { Component, OnInit, Input } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.model';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit {
  @Input() public listItem: CoursesListItem;

  constructor() { }

  ngOnInit() {
  }

}
