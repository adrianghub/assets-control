import { Album } from '@/app/shared/models/album.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { AlbumPhoto } from '../../models/album-photo.model';
import { albumDetailsActions } from './album-details.actions';

interface AblumDetailsState {
  album: Album | undefined;
  albumLoading: boolean;
  albumErrorMessage: string | null;

  photos: AlbumPhoto[];
  photosLoading: boolean;
  photosErrorMessage: string | null;
}

const initialState: AblumDetailsState = {
  album: undefined,
  albumLoading: false,
  albumErrorMessage: null,

  photos: [],
  photosLoading: false,
  photosErrorMessage: null,
};

const reducer = createReducer(
  initialState,
  // albums
  on(albumDetailsActions.albumLoading, (state) => ({
    ...state,
    albumLoading: true,
    albumErrorMessage: null,
  })),
  on(albumDetailsActions.albumLoadedSuccess, (state, { album }) => ({
    ...state,
    album,
    loading: false,
  })),
  on(
    albumDetailsActions.albumLoadedFailure,
    (state, { albumErrorMessage }) => ({
      ...state,
      albumLoading: false,
      albumErrorMessage,
    })
  ),
  // album photos
  on(albumDetailsActions.photosLoading, (state) => ({
    ...state,
    photosLoading: true,
    photosErrorMessage: null,
  })),
  on(albumDetailsActions.photosLoadedSuccess, (state, { photos }) => ({
    ...state,
    photos,
    photosLoading: false,
  })),
  on(
    albumDetailsActions.photosLoadedFailure,
    (state, { photosErrorMessage }) => ({
      ...state,
      photosLoading: false,
      photosErrorMessage,
    })
  )
);

export const albumDetailsFeature = createFeature({
  name: 'album-details',
  reducer,
});
