import { Route } from '@angular/router';
import { UsersPage } from '@/features/users/pages/users.page';
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
    ],
  },
];
