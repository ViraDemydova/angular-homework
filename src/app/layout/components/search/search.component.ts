import {Component, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  textValue = 'Please, type something';

  constructor() {}

  ngOnInit() {}

  logText(value: string): void {
    console.log( `Text changed to '${value}'\n`);
  }
}
