import { combineReducers } from 'redux';

import { authentication } from './authentication/reducer';
import { data } from './data/reducer';

export const rootReducer = combineReducers({
  authentication,
  data,
});
