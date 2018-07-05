import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { CoursesListItemComponent } from './courses-list-item.component';
import {CourseModel} from '../../../models/courses-list-item.model';
import {CoursesListItemService} from '../../../services/courses-list-item.service';

describe('CoursesListItemComponent', () => {
  let component: CoursesListItemComponent;
  let fixture: ComponentFixture<CoursesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListItemComponent
      ],
      providers: [{provide: CoursesListItemService, useValue: CourseModel}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show TEST INPUT', () => {
    fixture.detectChanges();

    component.listItem.id = 5;

    const deleteButton = fixture.debugElement.query(By.css('.btn-delete'));
    deleteButton.triggerEventHandler('click', null);

    expect(fixture.nativeElement.querySelector('.id').innerText).toEqual('5');
  });
});
