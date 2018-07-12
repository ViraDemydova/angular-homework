import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Output() addCourse: EventEmitter<any> = new EventEmitter<any>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  str: string;

  constructor() { }

  ngOnInit() {
  }

  onAddCourse(event) {
    this.addCourse.emit(this.str);
  }

  // принимаем текст от search input
  // и передаем его родительскому компоненту
  onSearch(searchText: string) {
      this.search.emit(searchText);
  }

}
