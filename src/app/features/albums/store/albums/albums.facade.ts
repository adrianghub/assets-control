import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { albumsActions } from './albums.actions';
import { albumsFeature } from './albums.state';

@Injectable()
export class AlbumsFacade {
  private store = inject(Store);

  albums$ = this.store.select(albumsFeature.selectAlbums);
  loading$ = this.store.select(albumsFeature.selectLoading);
  errorMessage$ = this.store.select(albumsFeature.selectErrorMessage);

  loadAlbums(): void {
    this.store.dispatch(albumsActions.albumsLoading());
  }
}
