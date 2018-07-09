import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import {CoursesListItemComponent} from './courses-list-item/courses-list-item.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CoursesListItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Courses-list component should contain "LOAD MORE:', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('LOAD MORE');
  });

});
