import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../../models/todos.model';
import { User } from '../../models/users.model';

export const userDetailsActions = createActionGroup({
  source: 'User Details',
  events: {
    userLoading: props<{ userId: number }>(),
    userLoadedSuccess: props<{ user: User }>(),
    userLoadedFailure: props<{ userErrorMessage: string }>(),

    todosLoading: props<{ userId: number }>(),
    todosLoadedSuccess: props<{ todos: Todo[] }>(),
    todosLoadedFailure: props<{ todosErrorMessage: string }>(),

    addTodo: props<{ todo: Todo }>(),
    addTodoFailure: props<{ todoActionErrorMessage: string }>(),
    addTodoSuccess: emptyProps(),

    editTodo: props<{ todo: Todo }>(),
    editTodoFailure: props<{ todoActionErrorMessage: string }>(),
    editTodoSuccess: emptyProps(),

    deleteTodo: props<{ todoId: number }>(),
    deleteTodoFailure: props<{ todoActionErrorMessage: string }>(),
    deleteTodoSuccess: emptyProps(),
  },
});
