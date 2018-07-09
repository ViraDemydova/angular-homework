import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListItemComponent } from './courses-list-item.component';
import { CoursesListItem } from '../../../models/courses-list-item.model';

@Component({
  template: `
    <app-courses-list-item [listItem]="item" (deleteCourse)="onChangeId($event)"></app-courses-list-item>`
})
class TestHostComponent {
  public item: CoursesListItem = {
    id: 5,
    title: 'Video Course ',
    createDate: '05.29.2018',
    duration: '1h 28min',
    description: 'Lorem Ipsum is simply dummy text'
  };
  public deletedListItemId: number; // for testing purpose
  public onChangeId(id: number) {
    this.deletedListItemId = id; // publication as we expected
  }
}

describe('CoursesListItemComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let idElem: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListItemComponent, TestHostComponent]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;

    // element that takes transferred input
    idElem = fixture.debugElement.query(By.css('h3'));
    fixture.detectChanges();
  });

  it('should display as INPUT:', () => {
    fixture.detectChanges();
    expect(idElem.nativeElement.textContent).toContain(testHost.item.title);
  });

  it('Should get id as OUTPUT: ', () => {
    fixture.detectChanges();

    const expectedCoursesId = 5;

    const deleteButton = fixture.debugElement.query(By.css('.btn-delete'));
    deleteButton.triggerEventHandler('click', null);

    expect(testHost.deletedListItemId).toEqual(expectedCoursesId);
  });
});
