import * as newCourse from './reducers/course.reducers';
import * as editCourse from './reducers/course.reducers';
import { createFeatureSelector} from '@ngrx/store';

export interface AddCourseState {
  AddCourseState: newCourse.State;
}

export const reducersAdd = {
  newCourse: newCourse.reducerAdd
}

//export interface EditCourseState {
 // EditCourseState: editCourse.State;
//}

//export const reducersEdit = {
  //editCourse: editCourse.reducerEdit
//}


export const courseAddSelector = createFeatureSelector<any>('newCourse');
//export const courseEditSelector = createFeatureSelector<any>('editCourse');

