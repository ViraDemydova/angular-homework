import {Component, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText = 'Please, type something';

  constructor() {}

  ngOnInit() {}

  onLogText(value: string): void {
    console.log( `Text changed to '${value}'\n`);
  }
}
