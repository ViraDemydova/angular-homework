import {Component, OnInit,  Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 @Output() search: EventEmitter<string> = new EventEmitter<string>();
  searchText: any;

  constructor() {}

  ngOnInit() {}

  onSubmit(value) {
    this.search.emit(value);
  }
}
