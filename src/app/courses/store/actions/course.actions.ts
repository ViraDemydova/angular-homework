import { Action } from '@ngrx/store';
import { CoursesListItem } from '../../models/courses-list-item.model';

export enum CoursesActionTypes {
  LOAD_SUCCESS = '[Course] Load Success',
  LOAD_FAILURE = '[Course] Load Failure',
  DELETE_SUCCESS = '[Course] Delete Success'
}

export class LoadSuccess implements Action {
  readonly type = CoursesActionTypes.LOAD_SUCCESS;

  constructor(public courses: CoursesListItem[]) {
  }
}

export class LoadFailure implements Action {
  readonly type = CoursesActionTypes.LOAD_FAILURE;

  constructor(public courses: CoursesListItem[]) {
  }
}

export class DeleteSuccess implements Action {
  readonly type = CoursesActionTypes.DELETE_SUCCESS;

  constructor(public course: CoursesListItem) {
  }
}

export type All =
   LoadSuccess
   | LoadFailure
   | DeleteSuccess;


