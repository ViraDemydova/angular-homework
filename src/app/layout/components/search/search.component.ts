import {Component, OnInit,  Input} from '@angular/core';
import { CommunicatorService} from '../../../service/communicator.service';


@Component({
  selector: 'app-search',
  providers: [CommunicatorService],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //@Input() public searchText: string;
  //filterToggle: boolean;
  counter = 0;

  constructor(
    private communicatorService: CommunicatorService) {}

  ngOnInit() {}

  //onLogText(value: string): void {
    //console.log( `Text changed to '${value}'\n`);
  //}

  onSubmit() {
    this.counter++;
    this.communicatorService.publishData(`Data from search(${this.counter})`);
  }
}
