import { Injectable } from '@angular/core';
import { CoursesListItem } from '../models/courses-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesListItemService {

  constructor() { }

  public getCourseListItems(): CoursesListItem[] {
    return [
      {
        id: 1,
        title: 'Video Course ',
        createDate: '05.29.2018',
        duration: '1h 28min',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        id: 2,
        title: 'Video Course ',
        createDate: '05.29.2018',
        duration: '1h 28min',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        id: 3,
        title: 'Video Course ',
        createDate: '05.29.2018',
        duration: '1h 28min',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        id: 4,
        title: 'Video Course ',
        createDate: '05.29.2018',
        duration: '1h 28min',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        id: 5,
        title: 'Video Course ',
        createDate: '05.29.2018',
        duration: '1h 28min',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
    ];
  }
}
