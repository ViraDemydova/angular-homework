import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import {CoursesListItemComponent} from './courses-list-item/courses-list-item.component';
import {CoursesListItemService} from "../../services/courses-list-item.service";

// stub courseService для тестирования компонента
const courseServiceStub = {
  id: 1,
  title: 'Video Course ',
  createDate: '05.29.2018',
  duration: '1h 28min',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
};


describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let courseService: CoursesListItemService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CoursesListItemComponent
      ],
      providers: [
        CoursesListComponent,
        CoursesListItemComponent,
        { provide: CoursesListItemService, useValue: courseServiceStub }
      ]
    });

    component = TestBed.get(CoursesListComponent);
    courseService = TestBed.get(CoursesListItemService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should show id after Angular calls ngOnInit', () => {
    component.ngOnInit();
    expect(courseServiceStub.id).toContain(1);
  });
});
