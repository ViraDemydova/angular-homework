import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogOffComponent } from './user-log-off.component';

describe('UserLogOffComponent', () => {
  let component: UserLogOffComponent;
  let fixture: ComponentFixture<UserLogOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLogOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLogOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
