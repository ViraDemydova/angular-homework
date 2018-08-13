import {Component, OnInit,  Output, EventEmitter } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subject } from 'rxjs/Rx';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //public searchControl: FormControl;
  private debounce = 200;
  public search: any;
  @Output() searchText: EventEmitter<string> = new EventEmitter<string>();
  public searchInput = new Subject <string> ();

  constructor() {}

  ngOnInit() {
    // this.searchControl = new FormControl('');
    // this.searchControl.valueChanges
    this.searchInput
     .pipe(debounceTime(this.debounce), distinctUntilChanged(), filter((query: string) => query.length === 0 || query.length > 2 ))
     .subscribe(e => {
      this.searchText.emit(e);
     });
  }

  public onChange(e) {
    this.search = this.searchInput.next(e);
  }

}
