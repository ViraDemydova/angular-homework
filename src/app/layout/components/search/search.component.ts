import {Component, OnInit,  Output, EventEmitter} from '@angular/core';
import { CommunicatorService} from '../../../service/communicator.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //filterToggle: boolean;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  searchText: string;

  constructor(
    private communicatorService: CommunicatorService) {}

  ngOnInit() {}

  onSubmit() {
    //this.communicatorService.publishData(`${this.filterToggle}`);
    // передадим родительскому компоненту текст из инпута поиска
    this.search.emit(this.searchText);
  }
}
