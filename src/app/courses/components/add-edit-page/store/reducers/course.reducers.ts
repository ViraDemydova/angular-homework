import {All, CourseActionTypes} from '../actions/course.actions';
import {CourseModel, CoursesListItem} from '../../../../models/courses-list-item.model';

export interface State {
  newCourse: CoursesListItem;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  newCourse: {id: 777, createDate: {}, authors: [], description: '', title: '', duration: 60},
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


//export const coursesSelector = (state: State) => state.courses;

