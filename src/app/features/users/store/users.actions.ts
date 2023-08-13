import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../users.model';

export const usersActions = createActionGroup({
  source: 'Users',
  events: {
    usersLoading: emptyProps(),
    usersLoadedSuccess: props<{ users: User[] }>(),
    usersLoadedFailure: props<{ errorMessage: string }>(),
    addUser: props<{ user: User }>(),
    addUserSuccess: emptyProps(),
  },
});
