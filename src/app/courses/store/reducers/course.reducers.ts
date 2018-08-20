import { All, CoursesActionTypes } from '../actions/course.actions';
import { CoursesListItem } from '../../models/courses-list-item.model';

export interface State {
  courses: CoursesListItem[];
  // error message
  errorMessage: string | null;
  id: number;
}

export const initialState: State = {
  courses: [],
  errorMessage: null,
  id: 0
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
    case CoursesActionTypes.DELETE_SUCCESS: {
      const updatedCourses = state.courses.filter((course) => course.id !== action.id);

      const stateChange: any = {
        courses:  updatedCourses
      };

      return stateChange;
    }
    default: {
      return state;
    }
  }
}

