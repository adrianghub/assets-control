import { Album } from '@/app/shared/models/album.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
import { User } from '../../models/user.model';
import { userDetailsActions } from './user-details.actions';

interface UserDetailsState {
  user: User | undefined;
  userLoading: boolean;
  userErrorMessage: string | null;

  todos: Todo[];
  todosLoading: boolean;
  todosErrorMessage: string | null;
  todoActionErrorMessage: string | null;

  albums: Album[];
  albumsLoading: boolean;
  albumsErrorMessage: string | null;
}

const initialState: UserDetailsState = {
  user: undefined,
  userLoading: false,
  userErrorMessage: null,

  todos: [],
  todosLoading: false,
  todosErrorMessage: null,
  todoActionErrorMessage: null,

  albums: [],
  albumsLoading: false,
  albumsErrorMessage: null,
};

const reducer = createReducer(
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
  on(userDetailsActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [todo, ...state.todos],
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

export const userDetailsFeature = createFeature({
  name: 'user-details',
  reducer,
});
