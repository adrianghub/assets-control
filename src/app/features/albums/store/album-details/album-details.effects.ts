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
                  'Failed to load album details. Please refresh the browser.',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);
