import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoursesListItemComponent } from './courses-list-item.component';

describe('CoursesListItemComponent', () => {
  let component: CoursesListItemComponent,
  fixture: ComponentFixture<CoursesListItemComponent>,
  courseId: DebugElement;

  const expectedCourseId = 5;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

// search course with Id
  courseId = fixture.debugElement.query(By.css('#id'));

  it('should display video Id: ', () => {
    // assume that we get course id
    component.listItem.id = expectedCourseId;

    // detect changes for initial data binding
    fixture.detectChanges();

    expect(courseId.nativeElement.textContent).toContain(expectedCourseId);
  });

  it('should raise event when clicked', () => {
    let showId: number;
    // assume that we get course id
    component.listItem.id = expectedCourseId;

    // detect changes for initial data binding
    fixture.detectChanges();

    component.deleteCourse.subscribe((listItem: number) => (showId = listItem));

    const deleteButton = fixture.debugElement.query(By.css('.btn-delete'));
    deleteButton.triggerEventHandler('click', null);
    expect(showId).toBe(expectedCourseId);
  });

});
