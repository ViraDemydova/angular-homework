import * as course from './reducers/course.reducers';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import {CoursesListItem} from "../models/courses-list-item.model";

export interface CoursesState {
  courseState: course.State;
}

export const reducersLoad = {
  course: course.reducerLoad
}

//export const selectCourseState = (state: CoursesState) => state.courseState;

//export const coursesSelector: MemoizedSelector<CoursesState, CoursesListItem[]> = createSelector(selectCourseState, (state: course.State) => state.courses);

export const coursesSelector = createFeatureSelector<any>('course');
//export const coursesSelector = createSelector(selectCourseState, (state: course.State) => state.courses);

