import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AlbumsPage } from './pages/albums/albums.page';
import * as albumsEffects from './store/albums/albums.effects';
import { AlbumsFacade } from './store/albums/albums.facade';
import { AlbumsRepository } from './store/albums/albums.repository';
import { albumsFeature } from './store/albums/albums.state';

export const albumsRoutes: Route[] = [
  {
    path: '',
    component: AlbumsPage,
    providers: [
      AlbumsFacade,
      AlbumsRepository,
      provideState(albumsFeature),
      provideEffects(albumsEffects),
    ],
  },
];
