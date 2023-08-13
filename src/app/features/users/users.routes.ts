import { UsersPage } from '@/app/features/users/pages/users/users.page';
import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import * as usersEffects from './store/users.effects';
import { UsersFacade } from './store/users.facade';
import { UsersRepository } from './store/users.repository';
import { usersFeature } from './store/users.state';
import { UserManagementService } from './user-management.service';

export const usersRoutes: Route[] = [
  {
    path: '',
    providers: [
      UserManagementService,
      UsersRepository,
      UsersFacade,
      provideState(usersFeature),
      provideEffects(usersEffects),
    ],
    children: [
      {
        path: '',
        component: UsersPage,
      },
      {
        path: ':id',
        component: UserDetailsPage,
      },
    ],
  },
];
