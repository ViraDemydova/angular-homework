import { Component, OnInit } from '@angular/core';
import { UserEntityItem } from './user-entity/user-entity-item.model';
import { UserEntityItemService } from './user-entity/user-entity-item.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public UserItems: UserEntityItem[] = [];

  constructor(private userEntityService: UserEntityItemService) { }

  ngOnInit() {
    this.UserItems = this.userEntityService.getUserEntityItems();
  }
}
