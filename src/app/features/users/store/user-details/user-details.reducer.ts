import { createReducer, on } from '@ngrx/store';
import { userDetailsActions } from './user-details.actions';
import { initialState } from './user-details.state';

export const userDetailsReducer = createReducer(
  // user details
  initialState,
  on(userDetailsActions.userLoading, (state) => ({
    ...state,
    userLoading: true,
    userErrorMessage: null,
  })),
  on(userDetailsActions.userLoadedSuccess, (state, { user }) => {
    return {
      ...state,
      user,
      userLoading: false,
    };
  }),
  on(userDetailsActions.userLoadedFailure, (state, { userErrorMessage }) => ({
    ...state,
    userLoading: false,
    userErrorMessage,
  })),
  // user todos
  on(userDetailsActions.todosLoading, (state) => ({
    ...state,
    todosLoading: true,
    todosErrorMessage: null,
  })),
  on(userDetailsActions.todosLoadedSuccess, (state, { todos }) => {
    return {
      ...state,
      todos,
      todosLoading: false,
    };
  }),
  on(userDetailsActions.todosLoadedFailure, (state, { todosErrorMessage }) => ({
    ...state,
    todosLoading: false,
    todosErrorMessage,
  })),
  on(userDetailsActions.addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(
    userDetailsActions.addTodoFailure,
    (state, { todoActionErrorMessage }) => ({
      ...state,
      todoActionErrorMessage,
    })
  ),
  on(userDetailsActions.editTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos.map((u) => (u.id === todo.id ? todo : u))],
  })),
  on(
    userDetailsActions.editTodoFailure,
    (state, { todoActionErrorMessage }) => ({
      ...state,
      todoActionErrorMessage,
    })
  ),
  on(userDetailsActions.deleteTodo, (state, { todoId }) => ({
    ...state,
    todos: [...state.todos.filter((t) => t.id !== todoId)],
  })),
  on(
    userDetailsActions.deleteTodoFailure,
    (state, { todoActionErrorMessage }) => ({
      ...state,
      todoActionErrorMessage,
    })
  ),
  // user albums
  on(userDetailsActions.albumsLoading, (state) => ({
    ...state,
    albumsLoading: true,
    albumsErrorMessage: null,
  })),
  on(userDetailsActions.albumsLoadedSuccess, (state, { albums }) => {
    return {
      ...state,
      albums,
      albumsLoading: false,
    };
  }),
  on(
    userDetailsActions.albumsLoadedFailure,
    (state, { albumsErrorMessage }) => ({
      ...state,
      albumsLoading: false,
      albumsErrorMessage,
    })
  )
);
