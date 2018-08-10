import {Component, OnInit,  Output, EventEmitter } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import {Observable, Subject} from "rxjs/Rx";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //public searchControl: FormControl;
  private debounce = 500;
  public search: any;
  @Output() searchText: EventEmitter<string> = new EventEmitter<string>();
  public searchInput = new Subject <string> ();

  constructor() {}

  ngOnInit() {
    // this.searchControl = new FormControl('');
    // this.searchControl.valueChanges
    this.searchInput
     .pipe(debounceTime(this.debounce), distinctUntilChanged())
     .subscribe(e => {
      this.searchText.emit(e);
     });
  }

  public onChange(e) {
    this.search = this.searchInput.next(e);
  }

}
