import { Action } from '@ngrx/store';
import { CoursesListItem } from '../../../../../models/courses-list-item.model';

export enum CourseActionTypes {
  EDIT_COURSE_SUCCESS = '[Course] Edit Course Success',
  EDIT_COURSE_FAILURE = '[Course] Edit Course Failure'
}

export class EditCourseSuccess implements Action {
  readonly type = CourseActionTypes.EDIT_COURSE_SUCCESS;

  constructor(public course: CoursesListItem) {
  }
}

export class EditCourseFailure implements Action {
  readonly type = CourseActionTypes.EDIT_COURSE_FAILURE;

  constructor(public course: CoursesListItem) {
  }
}

export type All =
  EditCourseSuccess
   | EditCourseFailure;


