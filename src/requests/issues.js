import axios from 'axios';

export function createIssue(owner, repository, valuesToSubmit) {
  return axios.post(
    `/api/repos/${owner}/${repository}/iiissues?access_token=${localStorage.getItem(
      'access_token'
    )}`,
    valuesToSubmit
  );
}

export function getIssues() {
  const accessToken = localStorage.getItem('access_token');

  const owner = localStorage.getItem('owner');
  const repo = localStorage.getItem('repository');

  return axios.get(
    `https://api.github.com/repos/${owner}/${repo}/issues?access_token=${localStorage.getItem(
      'access_token'
    )}`
  );
}
