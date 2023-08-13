import { UsersPage } from '@/app/features/users/pages/users/users.page';
import { Route } from '@angular/router';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { UsersService } from './users.service';

export const usersRoutes: Route[] = [
  {
    path: '',
    providers: [UsersService],
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
