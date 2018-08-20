import { Action } from '@ngrx/store';
import { CoursesListItem } from '../../../../../models/courses-list-item.model';

export enum CourseActionTypes {
  ADD_COURSE_SUCCESS = '[Course] Add Course Success',
  ADD_COURSE_FAILURE = '[Course] Add Course Failure',
  //EDIT_COURSE_SUCCESS = '[Course] Edit Course Success',
  //EDIT_COURSE_FAILURE = '[Course] Edit Course Failure'
}

export class AddCourseSuccess implements Action {
  readonly type = CourseActionTypes.ADD_COURSE_SUCCESS;

  constructor(public course: CoursesListItem) {
  }
}

export class AddCourseFailure implements Action {
  readonly type = CourseActionTypes.ADD_COURSE_FAILURE;

  constructor(public course: CoursesListItem) {
  }
}

export type All =
  AddCourseSuccess
   | AddCourseFailure;


