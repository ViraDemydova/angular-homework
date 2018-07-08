import {Component, OnChanges, OnInit,  Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() public searchText: string;
  @Output() public filterToggle: boolean;

  constructor() {}

  ngOnInit() {}

  onLogText(value: string): void {
    console.log( `Text changed to '${value}'\n`);
  }

  onSubmit() {
    this.filterToggle = !this.filterToggle;
    console.log( `Submit button clicked ` + this.searchText);
  }
}
