import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType} from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class CourseEffects {

  constructor(
    private actions: Actions,
    private router: Router
  ) {}


}
