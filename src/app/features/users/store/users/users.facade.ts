import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { usersActions } from './users.actions';
import { usersFeature } from './users.state';

@Injectable()
export class UsersFacade {
  private store = inject(Store);

  users$ = this.store.select(usersFeature.selectUsers);
  loading$ = this.store.select(usersFeature.selectLoading);
  errorMessage$ = this.store.select(usersFeature.selectErrorMessage);

  loadUsers(): void {
    this.store.dispatch(usersActions.usersLoading());
  }

  addUser(user: User): void {
    this.store.dispatch(usersActions.addUser({ user }));
  }

  editUser(user: User): void {
    this.store.dispatch(usersActions.editUser({ user }));
  }
}
