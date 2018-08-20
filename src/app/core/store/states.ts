import * as auth from './reducers/auth.reducers';
import { createFeatureSelector } from '@ngrx/store';
import { CoursesListItem } from '../../courses/models/courses-list-item.model';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<CoursesListItem>('auth');

// Я бы рекоммендовал такую структуру папок для стора
// store
//   auth
//     auth.actions.ts
//     auth.effects.ts
//     auth.reducer.ts
//     auth.state.ts
//   courses
//     cources.actions.ts
//     cources.effects.ts
//     cources.reducer.ts
//     cources.state.ts
//  router
//     router.state.ts
//     router.actions.ts
// app.state.ts
// Не раскидывать стор по всему приложению, а хранить его в одном месте.
