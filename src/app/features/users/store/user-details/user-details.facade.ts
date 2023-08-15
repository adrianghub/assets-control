import { Injectable, inject } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { Todo } from '../../models/todo.model';
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

  albums$ = this.store.select(userDetailsFeature.selectAlbums);
  albumsLoading$ = this.store.select(userDetailsFeature.selectAlbumsLoading);
  albumsErrorMessage$ = this.store.select(
    userDetailsFeature.selectAlbumsErrorMessage
  );

  loadUserDetails(userId: number): void {
    this.store.dispatch(userDetailsActions.userLoading({ userId }));
  }

  loadUserTodos(userId: number): void {
    this.store.dispatch(userDetailsActions.todosLoading({ userId }));
  }

  loadUserAlbums(userId: number): void {
    this.store.dispatch(userDetailsActions.albumsLoading({ userId }));
  }

  addTodo(todo: Todo): void {
    this.store.dispatch(userDetailsActions.addTodo({ todo }));
  }

  editTodo(todo: Todo): void {
    this.store.dispatch(userDetailsActions.editTodo({ todo }));
  }

  deleteTodo(todoId: number): void {
    this.store.dispatch(userDetailsActions.deleteTodo({ todoId }));
  }
}

const userViewModelSelector = createSelector({
  user: userDetailsFeature.selectUser,
  userLoading: userDetailsFeature.selectUserLoading,
  userErrorMessage: userDetailsFeature.selectUserErrorMessage,
});
