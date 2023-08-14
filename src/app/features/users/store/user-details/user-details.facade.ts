import { Injectable, inject } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { Todo } from '../../models/todos.model';
import { userDetailsActions } from './user-details.actions';
import { userDetailsFeature } from './user-details.state';

@Injectable()
export class UserDetailsFacade {
  private store = inject(Store);

  userViewModel$ = this.store.select(userViewModelSelector);

  todos$ = this.store.select(userDetailsFeature.selectTodos);
  todosLoading$ = this.store.select(userDetailsFeature.selectTodosLoading);
  todosErrorMessage$ = this.store.select(
    userDetailsFeature.selectTodosErrorMessage
  );

  loadUserDetails(id: number): void {
    this.store.dispatch(userDetailsActions.userLoading({ id }));
  }

  loadUserTodos(id: number): void {
    this.store.dispatch(userDetailsActions.todosLoading({ id }));
  }

  addTodo(todo: Todo): void {
    this.store.dispatch(userDetailsActions.addTodo({ todo }));
  }

  editTodo(todo: Todo): void {
    this.store.dispatch(userDetailsActions.editTodo({ todo }));
  }
}

const userViewModelSelector = createSelector({
  user: userDetailsFeature.selectUser,
  userLoading: userDetailsFeature.selectUserLoading,
  userErrorMessage: userDetailsFeature.selectUserErrorMessage,
});
