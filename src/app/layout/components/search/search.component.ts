import {Component, OnInit,  Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 @Output() search: EventEmitter<string> = new EventEmitter<string>();
  searchText: string;

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    // передадим родительскому компоненту текст из инпута поиска
    this.search.emit(this.searchText);
    //this.communicatorService.publishData(this.searchText);
  }
}
