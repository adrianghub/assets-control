import { createReducer, on } from '@ngrx/store';
import { albumsActions } from './albums.actions';
import { initialState } from './albums.state';

export const albumsReducer = createReducer(
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
