import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class CourseEffects {

  constructor(
    private actions: Actions,
    private router: Router
  ) {}


}
