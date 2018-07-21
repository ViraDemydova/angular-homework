import { Component, Input, OnInit } from '@angular/core';
import {AddCourse} from './models/add-page.model';
import {AddPage} from './services/add-page.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {
  @Input() public newItem: AddCourse;
  @Input() public title: string;
  @Input() public description: string;
  @Input() public createDate: Object;
  @Input() public duration: string;
  @Input() public  author: string;

  constructor(private addCourse: AddPage) { }

  ngOnInit() {
    this.newItem = {
        title: 'New Video Course',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        createDate: new Date('2015-01-02 12:00:00'),
        duration: 120,
        author: 'Vera Demidova'
      };
  }

  onHandleclick() {
    console.log('hey, I am a simple handler with console log\n');
  }

}
