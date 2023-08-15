import { createFeature, createReducer, on } from '@ngrx/store';
import { Album } from '../../models/albums.model';
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
