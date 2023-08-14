import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { userDetailsActions } from './user-details.actions';
import { UserDetailsRepository } from './user-details.repository';

export const loadUserDetails = createEffect(
  (
    actions$ = inject(Actions),
    userDetailsRepository = inject(UserDetailsRepository)
  ) => {
    return actions$.pipe(
      ofType(userDetailsActions.userLoading),
      exhaustMap(({ id }) => {
        return userDetailsRepository.getUserDetails(id).pipe(
          map((user) => userDetailsActions.userLoadedSuccess({ user })),
          catchError(() =>
            of(
              userDetailsActions.userLoadedFailure({
                userErrorMessage:
                  'Failed to load user details. Please refresh the browser.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const loadUserTodos = createEffect(
  (
    actions$ = inject(Actions),
    userDetailsRepository = inject(UserDetailsRepository)
  ) => {
    return actions$.pipe(
      ofType(userDetailsActions.todosLoading),
      exhaustMap(({ id }) =>
        userDetailsRepository.getUserTodos(id).pipe(
          map((todos) => userDetailsActions.todosLoadedSuccess({ todos })),
          catchError(() =>
            of(
              userDetailsActions.todosLoadedFailure({
                todosErrorMessage:
                  'Failed to load user todos. Please refresh the browser.',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const addTodo = createEffect(
  (
    actions$ = inject(Actions),
    userDetailsRepository = inject(UserDetailsRepository)
  ) => {
    return actions$.pipe(
      ofType(userDetailsActions.addTodo),
      exhaustMap(({ todo }) => {
        return userDetailsRepository.postTodo(todo).pipe(
          map(() => userDetailsActions.addTodoSuccess()),
          catchError(() =>
            of(
              userDetailsActions.addTodoFailure({
                todoActionErrorMessage: 'Failed to add todo. Please try again.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const editTodo = createEffect(
  (
    actions$ = inject(Actions),
    userDetailsRepository = inject(UserDetailsRepository)
  ) => {
    return actions$.pipe(
      ofType(userDetailsActions.editTodo),
      exhaustMap(({ todo }) => {
        return userDetailsRepository.patchTodo(todo).pipe(
          map(() => userDetailsActions.editTodoSuccess()),
          catchError(() =>
            of(
              userDetailsActions.editTodoFailure({
                todoActionErrorMessage:
                  'Failed to edit todo. Please try again.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);
