import { All, CourseActionTypes } from '../actions/course.actions';

export interface State {
  editedCourseId: number;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  editedCourseId: 0,
  errorMessage: null
};

export function reducerEdit(state = initialState, action: All): State {
  switch (action.type) {
    case CourseActionTypes.EDIT_COURSE_SUCCESS: {
      const stateChange: any = {
        editedCourse:  action.course
      };

      return stateChange;
    }
    case CourseActionTypes.EDIT_COURSE_FAILURE: {
      return {
        ...state,
        errorMessage: 'Error occurs while course editing'
      };
    }
    default: {
      return state;
    }
  }
}


