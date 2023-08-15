import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AlbumDetailsPage } from './pages/album-details/album-details.page';
import { AlbumsPage } from './pages/albums/albums.page';
import * as albumDetailsEffects from './store/album-details/album-details.effects';
import { AlbumDetailsFacade } from './store/album-details/album-details.facade';
import { AlbumDetailsRepository } from './store/album-details/album-details.repository';
import { albumDetailsFeature } from './store/album-details/album-details.state';
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
  {
    path: ':id',
    component: AlbumDetailsPage,
    providers: [
      AlbumDetailsFacade,
      AlbumDetailsRepository,
      provideState(albumDetailsFeature),
      provideEffects(albumDetailsEffects),
    ],
  },
];
