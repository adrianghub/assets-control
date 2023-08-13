import { Route } from '@angular/router';
import { BaseLayout } from './core/layouts/base-layout/base.layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: BaseLayout,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.routes').then((m) => m.usersRoutes),
      },
      {
        path: 'albums',
        loadChildren: () =>
          import('./features/albums/albums.routes').then((m) => m.albumsRoutes),
      },
      {
        path: '**',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ],
  },
];
