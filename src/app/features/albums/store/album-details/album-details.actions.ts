import { Album } from '@/app/shared/models/album.model';
import { createActionGroup, props } from '@ngrx/store';
import { AlbumPhoto } from '../../models/album-photo.model';

export const albumDetailsActions = createActionGroup({
  source: 'Album Details',
  events: {
    albumLoading: props<{ albumId: number }>(),
    albumLoadedSuccess: props<{ album: Album }>(),
    albumLoadedFailure: props<{ albumErrorMessage: string }>(),

    photosLoading: props<{ albumId: number }>(),
    photosLoadedSuccess: props<{ photos: AlbumPhoto[] }>(),
    photosLoadedFailure: props<{ photosErrorMessage: string }>(),
  },
});
