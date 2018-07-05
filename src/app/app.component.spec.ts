import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './layout/components/header/header.component';
import {UserLogInComponent} from './layout/components/user-log-in/user-log-in.component';
import {BreadcrumbsComponent} from './layout/components/breadcrumbs/breadcrumbs.component';
import {FooterComponent} from './layout/components/footer/footer.component';
import {LogoComponent} from './layout/components/logo/logo.component';
import {UserLogOffComponent} from './layout/components/user-log-off/user-log-off.component';
import {SearchComponent} from './layout/components/search/search.component';
import {ToolboxComponent} from './layout/components/toolbox/toolbox.component';
import {CoursesListItemComponent} from './courses/components/courses-list/courses-list-item/courses-list-item.component';
import {CoursesListComponent} from './courses/components/courses-list/courses-list.component';
import {CoursesPageComponent} from './courses/components/courses-page/courses-page.component';
import {UserComponent} from './users/components/user.component';
import {UserEntityComponent} from './users/components/user-entity/user-entity.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        UserLogInComponent,
        BreadcrumbsComponent,
        FooterComponent,
        LogoComponent,
        UserLogInComponent,
        UserLogOffComponent,
        SearchComponent,
        ToolboxComponent,
        CoursesListItemComponent,
        CoursesListComponent,
        CoursesPageComponent,
        UserComponent,
        UserEntityComponent
      ],
      imports: [ FormsModule ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-homework!');
  }));
});
