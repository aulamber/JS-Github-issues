import { createReducer } from '../createReducer';
import {
  RESET_ERROR,
  RESET_DATA,
  RESET_LOADING,
  RESET_NEW_ISSUE_URL,
  RESET_REPOSITORIES,
  SET_ERROR,
  SET_LOADING,
  SET_NEW_ISSUE_URL,
  SET_REPOSITORIES,
} from './actions';

const initialState = {
  error: '',
  loading: false,
  newIssueUrl: '',
  repositories: [],
};

const actionsHandlers = {
  [RESET_ERROR]: state => {
    return {
      ...state,
      error: initialState.error,
    };
  },

  [RESET_DATA]: () => initialState,

  [RESET_LOADING]: state => {
    return {
      ...state,
      loading: initialState.loading,
    };
  },

  [RESET_NEW_ISSUE_URL]: state => {
    return {
      ...state,
      newIssueUrl: initialState.newIssueUrl,
    };
  },

  [RESET_REPOSITORIES]: state => {
    return {
      ...state,
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

  [SET_NEW_ISSUE_URL]: (state, action) => {
    return {
      ...state,
      newIssueUrl: action.newIssueUrl,
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
