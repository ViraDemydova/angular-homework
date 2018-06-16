import { Component, OnInit, Input } from '@angular/core';
import { UserEntityItem } from './user-entity-item.model';

@Component({
  selector: 'app-user-entity',
  templateUrl: './user-entity.component.html',
  styleUrls: ['./user-entity.component.css']
})
export class UserEntityComponent implements OnInit {
  @Input() public userItem: UserEntityItem;

  constructor() { }

  ngOnInit() {
  }

}
