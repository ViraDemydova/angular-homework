import {Component, OnInit,  Input} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public filterToggle: boolean;
  @Input() public searchText: string;

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
