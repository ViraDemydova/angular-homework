import { Injectable } from '@angular/core';
import { UserEntityItem } from '../models/user-entity-item.model';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UserEntityItemService {
  private fakeUsers: UserEntityItem[] = [];

  constructor() {
    this.fakeUsers = [
      {
        id: 1,
        firstName: 'Vera',
        lastName: 'Demidova',
        email: 'vera.demidova@gmail.com'
      },
      {
        id: 2,
        firstName: 'Maria',
        lastName: 'Morozova',
        email: 'maria.morozova@gmail.com'
      }
    ];
  }

  //public getUserEntityItems(): UserEntityItem[] {
    //return Observable.of(this.fakeUsers).delay(5000);
  //}

  public  getUserEntityItems(): UserEntityItem[] {
    return this.fakeUsers;
    //return Observable.of(this.fakeUsers).delay(5000);
  }
}
