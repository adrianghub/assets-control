import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { albumDetailsActions } from './album-details.actions';
import { AlbumDetailsRepository } from './album-details.repository';

export const loadAlbums = createEffect(
  (
    actions$ = inject(Actions),
    albumDetailsRepository = inject(AlbumDetailsRepository)
  ) => {
    return actions$.pipe(
      ofType(albumDetailsActions.albumLoading),
      concatMap(({ albumId }) => {
        return albumDetailsRepository.getAlbumDetails(albumId).pipe(
          map((album) => albumDetailsActions.albumLoadedSuccess({ album })),
          catchError(() =>
            of(
              albumDetailsActions.albumLoadedFailure({
                albumErrorMessage:
                  'Failed to load album details. Please refresh the browser. If problem persists, try again later.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);

export const loadPhotos = createEffect(
  (
    actions$ = inject(Actions),
    albumDetailsRepository = inject(AlbumDetailsRepository)
  ) => {
    return actions$.pipe(
      ofType(albumDetailsActions.photosLoading),
      concatMap(({ albumId }) => {
        return albumDetailsRepository.getAlbumPhotos(albumId).pipe(
          map((photos) => albumDetailsActions.photosLoadedSuccess({ photos })),
          catchError(() =>
            of(
              albumDetailsActions.photosLoadedFailure({
                photosErrorMessage:
                  'Failed to load photos. Please refresh the browser. If problem persists, try again later.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);
