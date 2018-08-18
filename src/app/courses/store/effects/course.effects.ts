import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Observable } from 'rxjs';
import {
 CoursesActionTypes,
  LoadSuccess,
} from '../actions/course.actions';
import {catchError, map, switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CourseEffects {

  constructor(
    private actions: Actions,
    private router: Router
  ) {}


}
