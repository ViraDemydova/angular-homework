import {All, CoursesActionTypes} from '../actions/course.actions';
import { CoursesListItem } from '../../models/courses-list-item.model';

export interface State {
  courses: CoursesListItem[];
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  courses: [],
  errorMessage: null
};

export function reducerLoad(state = initialState, action: All): State {
  switch (action.type) {
    case CoursesActionTypes.LOAD_SUCCESS: {
      const stateChange: any = {
        courses:  action.courses
      };

      return stateChange;
    }
    case CoursesActionTypes.LOAD_FAILURE: {
      return {
        ...state,
        errorMessage: 'Error occurs while course loading'
      };
    }
    default: {
      return state;
    }
  }
}

//export const coursesSelector = (state: State) => state.courses;

