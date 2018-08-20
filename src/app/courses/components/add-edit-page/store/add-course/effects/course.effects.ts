// TODO: need to complete
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { CoursesListItemService } from '../../../../../services/courses-list-item.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AddCourseFailure, CourseActionTypes } from '../actions/course.actions';
import { CourseModel, CoursesListItem } from '../../../../../models/courses-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class AddCourseEffects {
  newItem: CourseModel;

  constructor(
    private actions: Actions,
    private courseService: CoursesListItemService,
    private router: Router
  ) {}

    @Effect()
    AddCourseSuccess: Observable<CoursesListItem> = this.actions
    .pipe(
      ofType(CourseActionTypes.ADD_COURSE_SUCCESS),
      switchMap(res => {
        return this.courseService.addItem(this.newItem)
          .pipe(
            map(item => {
              return new AddCourseSuccess();
            }),
            catchError((error) => {
              return Observable.of(new AddCourseFailure({error: error}));
            })
          );
      })
    );
}
