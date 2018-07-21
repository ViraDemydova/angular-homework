import { Injectable } from '@angular/core';
import {AddCourse} from '../models/add-page.model';

@Injectable({
  providedIn: 'root'
})

export class AddPage {
  private newCourse: AddCourse;

  constructor() {
    this.newCourse = {
        title: 'New Video Course',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        createDate: new Date('2015-01-02 12:00:00'),
        duration: 120,
        author: 'Vera Demidova'
      };
  }
}

