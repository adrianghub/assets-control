import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Album } from '../../models/albums.model';

export const albumsActions = createActionGroup({
  source: 'Albums',
  events: {
    albumsLoading: emptyProps(),
    albumsLoadedSuccess: props<{ albums: Album[] }>(),
    albumsLoadedFailure: props<{ errorMessage: string }>(),
  },
});
