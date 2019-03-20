import React, { Component } from 'react';
import { trimStart } from 'lodash';
import qs from 'query-string';
import axios from 'axios';

import { get } from '../../requests/httpMethods';
// import { GITHUB_URL } from '../../constants/baseUrl';
import { AppBar } from '../AppBar';
import { Form } from '../Form';
import { Wrapper } from './App.style';

function extractKeyValuesFromString(str) {
  return trimStart(str, '?')
    .split('&')
    .reduce((acc, elem) => {
      if (!elem) {
        return acc;
      }

      const elems = elem.split('=');
      return { ...acc, [elems[0]]: elems[1] };
    }, {});
}

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export class App extends Component {
  componentDidMount() {
    const params = {
      client_id,
    };
    const authorizeAppParams = {
      client_id,
      scope: 'repo',
    };
    let code = null;
    let token;
    const query = qs.extract(window.location.href);

    console.log(query);

    if (query) {
      code = qs.parse(query).code;
    }

    if (!code) {
      // authorize app
      window.location = `https://github.com/login/oauth/authorize?${qs.stringify(
        authorizeAppParams
      )}`;
    }

    params.client_secret = client_secret;
    params.code = code;

    // get access token thanks to the code
    axios
      .post(`/nonapi/login/oauth/access_token?${qs.stringify(params)}`)
      .then(res => {
        const { data } = res;
        const response = qs.parse(data);

        if (
          response.error_description ===
          'The code passed is incorrect or expired.'
        ) {
          window.location = `https://github.com/login/oauth/authorize?${qs.stringify(
            params
          )}`;
        }
        // we assume everything is alright now, but well...
        token = response.access_token;
        localStorage.setItem('access_token', token);
      })
      // .then(res => {
      //   const params = extractKeyValuesFromString(res);

      //   if (token) {
      //     localStorage.setItem('access_token', token);
      //   }
      // })
      .then(() => this.getUser())
      .catch(err => console.log('Error = ', err));
  }

  getUser = () => {
    get(
      `https://api.github.com/user?access_token=${localStorage.getItem(
        'access_token'
      )}`
    )
      .then(response => response.json())
      .then(res => {
        console.log('user = ', res);
        localStorage.setItem('user', res.login);
        localStorage.setItem('name', res.name);
        localStorage.setItem('avatar_url', res.avatar_url);
        localStorage.setItem('personal_github_url', res.html_url);
      })
      .catch(err => console.log('err = ', err));
  };

  render() {
    return (
      <Wrapper>
        <AppBar />

        <Form />
      </Wrapper>
    );
  }
}
