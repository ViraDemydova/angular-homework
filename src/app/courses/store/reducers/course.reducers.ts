import {All, CoursesActionTypes} from '../actions/course.actions';
import { CoursesListItem } from '../../models/courses-list-item.model';

export interface State {
  courses: CoursesListItem[];
}

export const initialState: State = {
  courses: [],
};

export function reducerLoad(state = initialState, action: All): State {
  switch (action.type) {
    case CoursesActionTypes.LOAD_SUCCESS: {
      const stateChange: any = {
        courses:  action.courses
      };

      return Object.assign({}, state, stateChange);
    }
    default: {
      return state;
    }
  }
}

//export const coursesSelector = (state: State) => state.courses;

