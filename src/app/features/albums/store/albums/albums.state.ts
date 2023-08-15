import { Album } from '@/app/shared/models/album.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { albumsActions } from './albums.actions';

interface AlbumsState {
  albums: Album[];
  loading: boolean;
  errorMessage: string | null;
}

const initialState: AlbumsState = {
  albums: [],
  loading: false,
  errorMessage: null,
};

const reducer = createReducer(
  initialState,
  // albums
  on(albumsActions.albumsLoading, (state) => ({
    ...state,
    loading: true,
    errorMessage: null,
  })),
  on(albumsActions.albumsLoadedSuccess, (state, { albums }) => ({
    ...state,
    albums,
    loading: false,
  })),
  on(albumsActions.albumsLoadedFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    errorMessage,
  }))
);

export const albumsFeature = createFeature({
  name: 'albums',
  reducer,
});
