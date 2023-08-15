import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  of,
  withLatestFrom,
} from 'rxjs';
import { usersActions } from './users.actions';
import { UsersFacade } from './users.facade';
import { UsersRepository } from './users.repository';

export const loadUsers = createEffect(
  (
    actions$ = inject(Actions),
    usersRepository = inject(UsersRepository),
    usersFacade = inject(UsersFacade)
  ) => {
    return actions$.pipe(
      ofType(usersActions.usersLoading),
      withLatestFrom(usersFacade.users$),
      concatMap(([, users]) => {
        if (users.length) {
          return of(usersActions.usersLoadedSuccess({ users }));
        } else {
          return usersRepository.getUsers().pipe(
            map((users) => usersActions.usersLoadedSuccess({ users })),
            catchError(() =>
              of(
                usersActions.usersLoadedFailure({
                  errorMessage:
                    'Failed to load users. Please refresh the browser. If problem persists, try again later.',
                })
              )
            )
          );
        }
      })
    );
  },
  { functional: true }
);

export const addUser = createEffect(
  (actions$ = inject(Actions), usersRepository = inject(UsersRepository)) => {
    return actions$.pipe(
      ofType(usersActions.addUser),
      exhaustMap(({ user }) => {
        return usersRepository.postUser(user).pipe(
          map(() => usersActions.addUserSuccess()),
          catchError(() =>
            of(
              usersActions.addUserFailure({
                userActionErrorMessage: 'Failed to add user. Please try again.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const editUser = createEffect(
  (actions$ = inject(Actions), usersRepository = inject(UsersRepository)) => {
    return actions$.pipe(
      ofType(usersActions.editUser),
      exhaustMap(({ user }) => {
        return usersRepository.patchUser(user).pipe(
          map(() => usersActions.editUserSuccess()),
          catchError(() =>
            of(
              usersActions.editUserFailure({
                userActionErrorMessage:
                  'Failed to edit user. Please try again.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);
