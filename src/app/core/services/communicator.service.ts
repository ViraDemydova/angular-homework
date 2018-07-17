import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CoreModule } from './../core.module';

@Injectable({
  providedIn: CoreModule
})
export class CommunicatorService {
  // Observable string sources
  private channel = new Subject<string>();
  searchText: string;

  // Observable string streams
  public channel$ = this.channel.asObservable();

  // Service message commands
  publishData(searchText: string) {
    this.channel.next(searchText);
  }
}
