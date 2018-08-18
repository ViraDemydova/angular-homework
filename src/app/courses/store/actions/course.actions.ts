import { Action } from '@ngrx/store';
import {CoursesListItem} from "../../models/courses-list-item.model";

export enum CoursesActionTypes {
  LOAD_SUCCESS = '[Course] Load Success',
}

export class LoadSuccess implements Action {
  readonly type = CoursesActionTypes.LOAD_SUCCESS;

  constructor(public courses: CoursesListItem[]) {
  }
}

export type All =
   LoadSuccess;
  //| LoginSuccess
  //| LoginFailure;


