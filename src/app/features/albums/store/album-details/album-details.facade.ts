import { Injectable, inject } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { albumDetailsActions } from './album-details.actions';
import { albumDetailsFeature } from './album-details.state';

@Injectable()
export class AlbumDetailsFacade {
  private store = inject(Store);

  albumViewModel$ = this.store.select(albumViewModelSelector);
  photosViewModel$ = this.store.select(photosViewModelSelector);

  loadAlbumDetails(albumId: number): void {
    this.store.dispatch(
      albumDetailsActions.albumLoading({
        albumId,
      })
    );
  }

  loadAlbumPhotos(albumId: number): void {
    this.store.dispatch(albumDetailsActions.photosLoading({ albumId }));
  }
}

const albumViewModelSelector = createSelector({
  album: albumDetailsFeature.selectAlbum,
  albumLoading: albumDetailsFeature.selectAlbumLoading,
  albumErrorMessage: albumDetailsFeature.selectAlbumErrorMessage,
});

const photosViewModelSelector = createSelector({
  photos: albumDetailsFeature.selectPhotos,
  photosLoading: albumDetailsFeature.selectPhotosLoading,
  photosErrorMessage: albumDetailsFeature.selectPhotosErrorMessage,
});
