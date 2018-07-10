import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  filterToggle: boolean;
  // Observable string sources
  private channel = new Subject<string>();

  // Observable string streams
  public channel2$ = this.channel.asObservable();

  // Service message commands
  publishData(data: string) {
    this.channel.next(data);
  }

  // Service message commands
  toggle() {
    this.filterToggle = !this.filterToggle;
  }


}
