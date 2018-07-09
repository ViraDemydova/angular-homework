import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {LogoComponent} from '../logo/logo.component';
import {UserLogOffComponent} from '../user-log-off/user-log-off.component';
import {UserLogInComponent} from '../user-log-in/user-log-in.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        LogoComponent,
        UserLogOffComponent,
        UserLogInComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Header should contain "User Log-in" text:', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('User Log-in');
  });
});
