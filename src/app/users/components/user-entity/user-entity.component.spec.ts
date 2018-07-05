import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntityComponent } from './user-entity.component';
import {UserEntityItemService} from '../../services/user-entity-item.service';
import {UserModel} from '../../models/user-entity-item.model';

describe('UserEntityComponent', () => {
  let component: UserEntityComponent;
  let fixture: ComponentFixture<UserEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserEntityComponent
      ],
      providers: [{provide: UserEntityItemService, useValue: UserModel}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
