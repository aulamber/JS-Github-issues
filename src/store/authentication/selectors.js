export const authenticationSelector = state => state.authentication;

export const accessTokenSelector = state =>
  authenticationSelector(state).accessToken;
