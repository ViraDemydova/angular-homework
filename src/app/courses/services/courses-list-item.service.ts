import { Injectable } from '@angular/core';
import { CoursesListItem } from '../models/courses-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesListItemService {
  date1 = new Date('05.29.2018');
  date2 = new Date('05.05.2018');
  date3 = new Date('01.29.2019');
  date4 = new Date('12.29.2017');
  date5 = new Date('02.01.2016');
  date6 = new Date('02.01.2021');

  private courses: CoursesListItem[] = [];

  updatedItem = {
    id: 5,
    title: 'I am updated item!!!!',
    createDate: this.date3,
    duration: 59,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  };

  updatedVal: any;

  constructor() {
    this.courses = [
      {
        id: 1,
        title: 'Video Course ',
        createDate: this.date1,
        duration: 120,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        topRated: true
      },
      {
        id: 2,
        title: 'Audio Course ',
        createDate: this.date2,
        duration: 70,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        id: 3,
        title: 'Video Course ',
        createDate: this.date3,
        duration: 59,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        id: 4,
        title: 'Audio Course ',
        createDate: this.date4,
        duration: 360,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        topRated: true
      },
      {
        id: 5,
        title: 'Video Course ',
        createDate: this.date5,
        duration: 20,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        topRated: true
      },
      {
        id: 6,
        title: 'Video Course ',
        createDate: this.date6,
        duration: 20,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      }
    ];
  }

  public getCourseListItems(): CoursesListItem[] {
    return this.courses;
  }

  public addData(item: CoursesListItem) {
    console.log('in service item is:', item);
    this.courses.push(item);
  }

  public deleteItem(item: CoursesListItem) {
    const index: number = this.courses.indexOf(item);
    if (index !== -1) {
      this.courses.splice(index, 1);
    }
  }

  public editItem() {
    this.courses.map((item: CoursesListItem, i) => {
      if (item.id === this.updatedItem.id) {
        this.courses[i] = this.updatedItem;
      }
    });
  }
}

