import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogInComponent } from './user-log-in.component';

describe('UserLogInComponent', () => {
  let component: UserLogInComponent;
  let fixture: ComponentFixture<UserLogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have <a> with "User Log-in"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const link = bannerElement.querySelector('a');
    expect(link.textContent).toEqual('User Log-in');
  });
});
