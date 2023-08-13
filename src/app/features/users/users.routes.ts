import { UsersPage } from '@/app/features/users/pages/users/users.page';
import { Route } from '@angular/router';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { UserManagementService } from './user-management.service';
import { UsersRepository } from './users.repository';

export const usersRoutes: Route[] = [
  {
    path: '',
    providers: [UserManagementService, UsersRepository],
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
