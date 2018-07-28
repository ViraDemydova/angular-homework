import { Injectable } from '@angular/core';
import { CoursesListItem } from '../models/courses-list-item.model';
import { courses } from './course-list-items.data';

@Injectable({
  providedIn: 'root'
})
export class CoursesListItemService {
  private courses: CoursesListItem[] = [];

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

  // Обычно в такой метод передается item: CoursesListItem
  public editItem(item: CoursesListItem) {
    this.courses.map((data: CoursesListItem, i) => {
      if (data.id === item.id) {
        this.courses[i] = item;
      }
    });
  }

  public getCourseListItems(): CoursesListItem[] {
    return this.courses;
  }

  public getCourseById(id: number): CoursesListItem {
    return this.courses.find(item => item.id === id) as CoursesListItem;
  }
}

