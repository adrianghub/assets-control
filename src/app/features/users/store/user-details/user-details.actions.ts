import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../../models/todos.model';
import { User } from '../../models/users.model';

export const userDetailsActions = createActionGroup({
  source: 'User Details',
  events: {
    userLoading: props<{ id: number }>(),
    userLoadedSuccess: props<{ user: User }>(),
    userLoadedFailure: props<{ userErrorMessage: string }>(),

    todosLoading: props<{ id: number }>(),
    todosLoadedSuccess: props<{ todos: Todo[] }>(),
    todosLoadedFailure: props<{ todosErrorMessage: string }>(),

    addTodo: props<{ todo: Todo }>(),
    addTodoFailure: props<{ todoActionErrorMessage: string }>(),
    addTodoSuccess: emptyProps(),

    editTodo: props<{ todo: Todo }>(),
    editTodoFailure: props<{ todoActionErrorMessage: string }>(),
    editTodoSuccess: emptyProps(),
  },
});
