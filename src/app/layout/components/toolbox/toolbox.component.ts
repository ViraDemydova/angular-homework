import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Output() addCourse: EventEmitter<any> = new EventEmitter<any>();

  str: string;

  constructor() { }

  ngOnInit() {
  }

  onAddCourse(event) {
    this.addCourse.emit(this.str);
  }


}
