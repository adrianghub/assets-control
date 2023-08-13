import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { usersActions } from './users.actions';
import { UsersRepository } from './users.repository';

export const loadUsers = createEffect(
  (actions$ = inject(Actions), usersRepository = inject(UsersRepository)) => {
    return actions$.pipe(
      ofType(usersActions.usersLoading),
      switchMap(() => {
        return usersRepository.getUsers().pipe(
          map((users) => usersActions.usersLoadedSuccess({ users })),
          catchError(() =>
            of(
              usersActions.usersLoadedFailure({
                errorMessage:
                  'Failed to load users. Please refresh the browser.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const addUser = createEffect(
  (actions$ = inject(Actions), usersRepository = inject(UsersRepository)) => {
    return actions$.pipe(
      ofType(usersActions.addUser),
      switchMap(({ user }) => {
        return usersRepository.postUser(user).pipe(
          map(() => usersActions.addUserSuccess()),
          catchError(() =>
            of(
              usersActions.usersLoadedFailure({
                errorMessage: 'Failed to add user. Please try again.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);
