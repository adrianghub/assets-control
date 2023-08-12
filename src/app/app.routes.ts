import { Route } from '@angular/router';

export const appRoutes: Route[] = [
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
];
