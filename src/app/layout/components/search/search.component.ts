import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  searchText: string;

  onSubmit() {
    // передадим родительскому компоненту текст из инпута поиска
    this.search.emit(this.searchText);
  }
}
