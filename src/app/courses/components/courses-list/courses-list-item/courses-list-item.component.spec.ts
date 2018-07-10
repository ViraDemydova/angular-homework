import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListItemComponent } from './courses-list-item.component';
import {CoursesListItem} from '../../../models/courses-list-item.model';

describe('CoursesListItemComponent', () => {
  let component: CoursesListItemComponent;
  let fixture: ComponentFixture<CoursesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('raises the pass event when clicked', () => {
    const comp = new CoursesListItemComponent();
    const listItem: CoursesListItem = { id: 5, title: 'Test', createDate: 'Test', duration: 'Test', description: 'Test' };
    comp.listItem = listItem;
    comp.deleteCourse.subscribe(d => {
      console.log('data d:', d);
      expect(d).toBe(listItem.id);
    } );
    comp.onDelete(onclick);
    console.log('test on delete:', comp.onDelete(onclick));
  });
});
