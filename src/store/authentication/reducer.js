import { createReducer } from '../createReducer';
import { RESET_ACCESS_TOKEN, SET_ACCESS_TOKEN } from './actions';

const initialState = {
  accessToken: null,
};

const actionsHandlers = {
  [RESET_ACCESS_TOKEN]: () => {
    return {
      ...initialState,
      accessToken: initialState.accessToken,
    };
  },

  [SET_ACCESS_TOKEN]: (state, action) => {
    return {
      ...state,
      accessToken: action.accessToken,
    };
  },
};

export const authentication = createReducer(actionsHandlers, initialState);
