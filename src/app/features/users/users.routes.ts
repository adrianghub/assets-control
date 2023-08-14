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

export const usersRoutes: Route[] = [
  {
    path: '',
    component: UsersPage,
    providers: [
      UserManagementService,
      UsersRepository,
      UsersFacade,
      provideState(usersFeature),
      provideEffects(usersEffects),
    ],
  },
  {
    path: ':id',
    component: UserDetailsPage,
    providers: [
      TodoManagementService,
      UserDetailsRepository,
      UserDetailsFacade,
      provideState(userDetailsFeature),
      provideEffects(userDetailsEffects),
    ],
  },
];
