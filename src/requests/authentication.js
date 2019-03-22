import axios from 'axios';
import qs from 'query-string';

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export function authenticateUser() {
  const params = {
    client_id,
  };

  const authorizeAppParams = {
    client_id,
    scope: 'repo',
  };

  const query = qs.extract(window.location.href);
  const code = query ? qs.parse(query).code : null;

  if (!code) {
    // Authorize app
    window.location = `https://github.com/login/oauth/authorize?${qs.stringify(
      authorizeAppParams
    )}`;
  }

  params.client_secret = client_secret;
  params.code = code;

  // Get access token thanks to the code
  return axios
    .post(`/nonapi/login/oauth/access_token?${qs.stringify(params)}`)
    .then(({ data }) => {
      const response = qs.parse(data);

      if (
        response.error_description ===
        'The code passed is incorrect or expired.'
      ) {
        window.location = `https://github.com/login/oauth/authorize?${qs.stringify(
          authorizeAppParams
        )}`;
      }

      return response.access_token;
    });
}
