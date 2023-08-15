import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const usersActions = createActionGroup({
  source: 'Users',
  events: {
    usersLoading: emptyProps(),
    usersLoadedSuccess: props<{ users: User[] }>(),
    usersLoadedFailure: props<{ errorMessage: string }>(),

    addUser: props<{ user: User }>(),
    addUserSuccess: emptyProps(),
    addUserFailure: props<{ userActionErrorMessage: string }>(),

    editUser: props<{ user: User }>(),
    editUserSuccess: emptyProps(),
    editUserFailure: props<{ userActionErrorMessage: string }>(),
  },
});
