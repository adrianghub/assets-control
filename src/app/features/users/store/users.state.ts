import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../users.model';
import { usersActions } from './users.actions';

interface State {
  users: User[];
  loading: boolean;
  errorMessage: string | null;
}

const initialState: State = {
  users: [],
  loading: false,
  errorMessage: null,
};

const reducer = createReducer(
  initialState,
  on(usersActions.usersLoading, (state) => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),
  on(usersActions.usersLoadedSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(usersActions.usersLoadedFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage,
  })),
  on(usersActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(usersActions.editUser, (state, { user }) => ({
    ...state,
    users: [...state.users.map((u) => (u.id === user.id ? user : u))],
  }))
);

export const usersFeature = createFeature({
  name: 'users',
  reducer,
});
