import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { BehaviorSubject } from "rxjs/Rx";

@Injectable({
  providedIn: CoreModule
})
export class SharedService {

  private user = new BehaviorSubject<string>('unknown');
  user$ = this.user.asObservable();

  publishData(user: string) {
    this.user.next(user);
  }
}
