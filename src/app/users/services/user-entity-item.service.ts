import { Injectable } from '@angular/core';
import { UserEntityItem } from '../models/user-entity-item.model';

@Injectable({
  providedIn: 'root'
})
export class UserEntityItemService {

  constructor() { }

  public getUserEntityItems(): UserEntityItem[] {
    return [
      {
        id: 1,
        firstName: 'Vera',
        lastName: 'Demidova'
      },
      {
        id: 2,
        firstName: 'Maria',
        lastName: 'Morozova'
      }
    ];
  }
}
