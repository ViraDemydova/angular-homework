import * as editedCourse from './reducers/course.reducers';
import { createFeatureSelector} from '@ngrx/store';

export interface AddCourseState {
  AddCourseState: editedCourse.State;
}

export const reducersAdd = {
  newCourse: editedCourse.reducerEdit
}

export const courseEditSelector = createFeatureSelector<any>('editedCourse');

