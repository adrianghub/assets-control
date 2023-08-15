import { UsersPage } from '@/app/features/users/pages/users/users.page';
import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { TodoManagementService } from './services/todos-management.service';
import { UserManagementService } from './services/users-management.service';
import * as userDetailsEffects from './store/user-details/user-details.effects';
import { UserDetailsFacade } from './store/user-details/user-details.facade';
import { UserDetailsRepository } from './store/user-details/user-details.repository';
import { userDetailsFeature } from './store/user-details/user-details.state';
import * as usersEffects from './store/users/users.effects';
import { UsersFacade } from './store/users/users.facade';
import { UsersRepository } from './store/users/users.repository';
import { usersFeature } from './store/users/users.state';
import { UserAlbumsTab } from './tabs/user-albums/user-albums.tab';
import { UserTodosTab } from './tabs/user-todos/user-todos.tab';

export const usersRoutes: Route[] = [
  {
    path: '',
    component: UsersPage,
    providers: [
      UsersFacade,
      UsersRepository,
      UserManagementService,
      provideState(usersFeature),
      provideEffects(usersEffects),
    ],
  },
  {
    path: ':id',
    component: UserDetailsPage,
    providers: [
      UserDetailsFacade,
      UserDetailsRepository,
      TodoManagementService,
      provideState(userDetailsFeature),
      provideEffects(userDetailsEffects),
    ],
    children: [
      {
        path: 'todos',
        component: UserTodosTab,
      },
      {
        path: 'albums',
        component: UserAlbumsTab,
      },
      {
        path: '**',
        redirectTo: 'todos',
        pathMatch: 'prefix',
      },
    ],
  },
];
