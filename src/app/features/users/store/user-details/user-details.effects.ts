import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs';
import { userDetailsActions } from './user-details.actions';
import { UserDetailsRepository } from './user-details.repository';

export const loadUserDetails = createEffect(
  (
    actions$ = inject(Actions),
    userDetailsRepository = inject(UserDetailsRepository)
  ) => {
    return actions$.pipe(
      ofType(userDetailsActions.userLoading),
      concatMap(({ userId }) => {
        return userDetailsRepository.getUserDetails(userId).pipe(
          map((user) => userDetailsActions.userLoadedSuccess({ user })),
          catchError(() =>
            of(
              userDetailsActions.userLoadedFailure({
                userErrorMessage:
                  'Failed to load user details. Please refresh the browser. If problem persists, try again later.',
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
      concatMap(({ userId }) =>
        userDetailsRepository.getUserTodos(userId).pipe(
          map((todos) => userDetailsActions.todosLoadedSuccess({ todos })),
          catchError(() =>
            of(
              userDetailsActions.todosLoadedFailure({
                todosErrorMessage:
                  'Failed to load user todos. Please refresh the browser. If problem persists, try again later.',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export const loadUserAlbums = createEffect(
  (
    actions$ = inject(Actions),
    userDetailsRepository = inject(UserDetailsRepository)
  ) => {
    return actions$.pipe(
      ofType(userDetailsActions.albumsLoading),
      concatMap(({ userId }) =>
        userDetailsRepository.getUserAlbums(userId).pipe(
          map((albums) => userDetailsActions.albumsLoadedSuccess({ albums })),
          catchError(() =>
            of(
              userDetailsActions.albumsLoadedFailure({
                albumsErrorMessage:
                  'Failed to load user albums. Please refresh the browser. If problem persists, try again later.',
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
          map((todo) => userDetailsActions.addTodoSuccess({ todo })),
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

export const deleteTodo = createEffect(
  (
    actions$ = inject(Actions),
    userDetailsRepository = inject(UserDetailsRepository)
  ) => {
    return actions$.pipe(
      ofType(userDetailsActions.deleteTodo),
      exhaustMap(({ todoId }) => {
        console.log(todoId);

        return userDetailsRepository.deleteTodo(todoId).pipe(
          map(() => userDetailsActions.deleteTodoSuccess()),
          catchError(() =>
            of(
              userDetailsActions.editTodoFailure({
                todoActionErrorMessage:
                  'Failed to delete todo. Please try again.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);
