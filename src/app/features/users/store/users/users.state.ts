import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { usersActions } from './users.actions';

interface UsersState {
  users: User[];
  loading: boolean;
  errorMessage: string | null;
  userActionErrorMessage: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  errorMessage: null,
  userActionErrorMessage: null,
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
  on(usersActions.addUserFailure, (state, { userActionErrorMessage }) => ({
    ...state,
    loading: false,
    userActionErrorMessage,
  })),
  on(usersActions.editUser, (state, { user }) => ({
    ...state,
    users: [...state.users.map((u) => (u.id === user.id ? user : u))],
  })),
  on(usersActions.editUserFailure, (state, { userActionErrorMessage }) => ({
    ...state,
    loading: false,
    userActionErrorMessage,
  }))
);

export const usersFeature = createFeature({
  name: 'users',
  reducer,
});
