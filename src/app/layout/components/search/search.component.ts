import {Component, OnInit,  Input} from '@angular/core';
import { CommunicatorService} from '../../../service/communicator.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //@Input() public searchText: string;
  filterToggle: boolean;

  constructor(
    private communicatorService: CommunicatorService) {}

  ngOnInit() {}

  onSubmit() {
    this.communicatorService.publishData(`${this.filterToggle}`);
  }
}
