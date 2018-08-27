// TODO: need to complete
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CoursesListItemService } from '../../../../../services/courses-list-item.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  CourseActionTypes,
  AddCourse,
  AddCourseSuccess,
  AddCourseFailure
} from '../actions/course.actions';
import { CoursesListItem } from '../../../../../models/courses-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class AddCourseEffects {

  constructor(
    private actions: Actions,
    private courseService: CoursesListItemService,
    private router: Router
  ) {}

   // @Effect()
    //AddCourse: Observable<any> = this.actions
   // .pipe(
    //  ofType(CourseActionTypes.ADD_COURSE_SUCCESS),
     // map((action: AddCourse) => action.course),
     // switchMap(course => {
    //    return this.courseService.addItem(course)
        //  .pipe(
       //     map(() => {
         //     return new AddCourseSuccess(course);
        //    }),
         //   catchError((error) => {
          //    return Observable.of(new AddCourseFailure({error: error}));
          //  })
         // );
      //})
   // );

 // @Effect({ dispatch: false })
 // AddCourseSuccess: Observable<any> = this.actions.pipe(
   // ofType(CourseActionTypes.ADD_COURSE_SUCCESS),
   // tap(() => {
    //  this.router.navigate(['landing-page']);
   // })
 // );

  // TODO: remove. useless effect
  //@Effect({ dispatch: false })
 // AddCourseFailure: Observable<any> = this.actions.pipe(
   // ofType(CoursesListItem.ADD_COURSE_FAILURE)
 // );
}
