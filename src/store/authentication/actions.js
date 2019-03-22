/* Loading */

export const RESET_ACCESS_TOKEN = 'RESET_ACCESS_TOKEN';
export const resetAccessToken = () => ({ type: RESET_ACCESS_TOKEN });

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const setAccessToken = accessToken => ({
  type: SET_ACCESS_TOKEN,
  accessToken,
});
