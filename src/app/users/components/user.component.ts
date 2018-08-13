import { Component, OnInit } from '@angular/core';
import { UserEntityItem } from '../models/user-entity-item.model';
import { UserEntityItemService } from '../services/user-entity-item.service';
import { Subscription } from 'rxjs/Rx';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public userItems: UserEntityItem[] = [];
  private usersCreateSubscription: Subscription;

  constructor(private userEntityService: UserEntityItemService,
              private serviceAuth: AuthService) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.usersCreateSubscription = this.userEntityService.getUsers().subscribe((res: UserEntityItem[]) => {
      this.userItems = res;
    });
  }

  onCheckCurrentUser() {
    this.serviceAuth.getAuthToken().subscribe((res: boolean) => {
      return res;
    });
  }
}
