import { CoursesListItem } from '../../../../../models/courses-list-item.model';
import { All, CourseActionTypes } from '../actions/course.actions';

export interface State {
  newCourse: CoursesListItem;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  newCourse: null,
  errorMessage: null
};

export function reducerAdd(state = initialState, action: All): State {
  switch (action.type) {
    case CourseActionTypes.ADD_COURSE_SUCCESS: {
      const stateChange: any = {
        newCourse:  action.course
      };

      return stateChange;
    }
    case CourseActionTypes.ADD_COURSE_FAILURE: {
      return {
        ...state,
        errorMessage: 'Error occurs while course adding'
      };
    }
    default: {
      return state;
    }
  }
}

