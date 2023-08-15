import { Album } from '@/app/shared/models/album.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const albumsActions = createActionGroup({
  source: 'Albums',
  events: {
    albumsLoading: emptyProps(),
    albumsLoadedSuccess: props<{ albums: Album[] }>(),
    albumsLoadedFailure: props<{ errorMessage: string }>(),
  },
});
