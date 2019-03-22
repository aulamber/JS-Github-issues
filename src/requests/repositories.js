import axios from 'axios';

export function getRepositories(accessToken) {
  const owner = localStorage.getItem('owner');
  // const access_token = localStorage.getItem('access_token');

  return axios.get(
    `https://api.github.com/users/${owner}/repos?access_token=${accessToken}&type=owner`
  );
}
