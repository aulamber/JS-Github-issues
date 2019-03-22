import { createReducer } from '../createReducer';
import {
  RESET_ERROR,
  RESET_LOADING,
  RESET_REPOSITORIES,
  SET_ERROR,
  SET_LOADING,
  SET_REPOSITORIES,
} from './actions';

const initialState = {
  error: '',
  loading: false,
  repositories: [],
};

const actionsHandlers = {
  [RESET_ERROR]: () => {
    return {
      ...initialState,
      error: initialState.error,
    };
  },

  [RESET_LOADING]: () => {
    return {
      ...initialState,
      loading: initialState.loading,
    };
  },

  [RESET_REPOSITORIES]: () => {
    return {
      ...initialState,
      repositories: initialState.repositories,
    };
  },

  [SET_ERROR]: (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  },

  [SET_LOADING]: (state, action) => {
    return {
      ...state,
      loading: action.loading,
    };
  },

  [SET_REPOSITORIES]: (state, action) => {
    return {
      ...state,
      repositories: action.repositories,
    };
  },
};

export const data = createReducer(actionsHandlers, initialState);
