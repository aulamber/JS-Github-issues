import axios from 'axios';

export function getUser() {
  return axios.get(
    `https://api.github.com/user?access_token=${localStorage.getItem(
      'access_token'
    )}`
  );
}
