import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponentComponent } from './courses-page-component.component';

describe('CoursesPageComponentComponent', () => {
  let component: CoursesPageComponentComponent;
  let fixture: ComponentFixture<CoursesPageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesPageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
