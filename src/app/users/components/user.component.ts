import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserEntityItem } from '../models/user-entity-item.model';
import { UserEntityItemService } from '../services/user-entity-item.service';
import { Subscription } from 'rxjs/Rx';
import {SharedService} from '../../core/services/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  public userItems: UserEntityItem[] = [];
  public user: UserEntityItem;
  private usersCreateSubscription: Subscription;

  constructor(private userEntityService: UserEntityItemService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.usersCreateSubscription = this.userEntityService.checkCurrentUser().subscribe((res: UserEntityItem) => {
      this.user = res;
      this.sharedService.publishData(this.user.login);
    });
  }

 ngOnDestroy(): void {
    if (this.usersCreateSubscription) {
      this.usersCreateSubscription.unsubscribe();
    }
  }
}
