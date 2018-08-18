import * as auth from './reducers/auth.reducers';
import { createFeatureSelector } from '@ngrx/store';
import {CoursesListItem} from "../../courses/models/courses-list-item.model";

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
}

export const selectAuthState = createFeatureSelector<CoursesListItem>('auth');
