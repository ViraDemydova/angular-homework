import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output()
  searchText: EventEmitter<string> = new EventEmitter<string>();

  // В задании говориться о том, что надо создать Observable
  // Но так тоже может быть.
  searchInput = new Subject<string>();

  private debounce = 200;
  private sub: Subscription;

  constructor() {}

  ngOnInit() {
    this.sub = this.searchInput
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        filter((query: string) => query.length === 0 || query.length > 2)
      )
      .subscribe(e => {
        this.searchText.emit(e);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onChange(newValue: string) {
    this.searchInput.next(newValue);
  }
}
