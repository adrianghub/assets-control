import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, withLatestFrom } from 'rxjs';
import { albumsActions } from './albums.actions';
import { AlbumsFacade } from './albums.facade';
import { AlbumsRepository } from './albums.repository';

export const loadAlbums = createEffect(
  (
    actions$ = inject(Actions),
    albumsRepository = inject(AlbumsRepository),
    albumsFacade = inject(AlbumsFacade)
  ) => {
    return actions$.pipe(
      ofType(albumsActions.albumsLoading),
      withLatestFrom(albumsFacade.albums$),
      concatMap(([, albums]) => {
        if (albums?.length) {
          return of(albumsActions.albumsLoadedSuccess({ albums }));
        } else {
          return albumsRepository.getAlbums().pipe(
            map((albums) => albumsActions.albumsLoadedSuccess({ albums })),
            catchError(() =>
              of(
                albumsActions.albumsLoadedFailure({
                  errorMessage:
                    'Failed to load albums. Please refresh the browser. If problem persists, try again later.',
                })
              )
            )
          );
        }
      })
    );
  },
  { functional: true }
);
