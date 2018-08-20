import * as newCourse from './reducers/course.reducers';
import { createFeatureSelector} from '@ngrx/store';

export interface AddCourseState {
  AddCourseState: newCourse.State;
}

export const reducersAdd = {
  newCourse: newCourse.reducerAdd
}

export const courseAddSelector = createFeatureSelector<any>('newCourse');


