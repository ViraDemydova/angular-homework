import { Injectable } from '@angular/core';
import { CoursesListItem } from '../models/courses-list-item.model';

import { courses } from './course-list-items.data';

@Injectable({
  providedIn: 'root'
})
export class CoursesListItemService {
  private courses: CoursesListItem[] = [];

  updatedItem = {
    id: 5,
    title: 'I am updated item!!!!',
    createDate: new Date('2019-01-29 12:00:00'),
    duration: 59,
    description:
      // tslint:disable-next-line:max-line-length
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  };

  constructor() {
    this.courses = courses;
  }

  public addItem(item: CoursesListItem) {
    console.log('in service item is:', item);
    this.courses.push(item);
  }

  public deleteItem(item: CoursesListItem) {
    const index: number = this.courses.indexOf(item);
    if (index !== -1) {
      this.courses.splice(index, 1);
    }
  }

  // TODO: Обычно в такой метод передается item: CoursesListItem
  public editItem() {
    this.courses.map((item: CoursesListItem, i) => {
      if (item.id === this.updatedItem.id) {
        this.courses[i] = this.updatedItem;
      }
    });
  }

  public getCourseListItems(): CoursesListItem[] {
    return this.courses;
  }

  public getCourseById(id: number): CoursesListItem {
    // TODO: надо реализовать
    return {} as CoursesListItem;
  }
}
