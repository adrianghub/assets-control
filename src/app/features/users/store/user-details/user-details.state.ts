import { createFeature, createReducer, on } from '@ngrx/store';
import { Todo } from '../../models/todos.model';
import { User } from '../../models/users.model';
import { userDetailsActions } from './user-details.actions';

interface UserDetailsState {
  user: User | undefined;
  todos: Todo[];
  userLoading: boolean;
  todosLoading: boolean;
  userErrorMessage: string | null;
  todosErrorMessage: string | null;
  todoActionErrorMessage: string | null;
}

const initialState: UserDetailsState = {
  user: undefined,
  todos: [],
  userLoading: false,
  todosLoading: false,
  userErrorMessage: null,
  todosErrorMessage: null,
  todoActionErrorMessage: null,
};

const userDetailsReducer = createReducer(
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
  )
);

export const userDetailsFeature = createFeature({
  name: 'user-details',
  reducer: userDetailsReducer,
});
