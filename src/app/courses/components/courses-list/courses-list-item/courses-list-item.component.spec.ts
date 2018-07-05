import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListItemComponent } from './courses-list-item.component';
import { CoursesListItem } from '../../../models/courses-list-item.model';

@Component({
  template: `
  <app-courses-list-item [listItem]="item" (deleteCourse)="onChangeId($event)"></app-courses-list-item>`
})
class TestHostComponent {
  public listItem: CoursesListItem = {
    id: 1,
    title: 'Video Course ',
    createDate: '05.29.2018',
    duration: '1h 28min',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
    'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  };
  public deletedListItem: CoursesListItem; // for testing purpose
  public onChangeId(deletedListItem: CoursesListItem) {
    this.deletedListItem = deletedListItem; // publication as we expected
  }
}

describe('CoursesListItemComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  //let listItem: CoursesListItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListItemComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
  });

  it('Deleted list item is: ', () => {
    fixture.detectChanges();

    const expectedCoursesListItem = this.listItem.id;

    const deleteButton = fixture.debugElement.query(By.css('.btn-delete'));
    deleteButton.triggerEventHandler('click', null);

    expect(testHost.deletedListItem).toEqual(expectedCoursesListItem);
  });
});
