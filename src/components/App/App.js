import React, { Component } from 'react';
import { trimStart } from 'lodash';

import { get } from '../../requests/httpMethods';
import { GITHUB_URL } from '../../constants/baseUrl';
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

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

export class App extends Component {
  componentDidMount() {
    console.log('access_token = ', localStorage.getItem('access_token'));
    if (
      localStorage.getItem('access_token') === 'undefined' ||
      localStorage.getItem('access_token') === 'null' ||
      !localStorage.getItem('access_token')
    ) {
      const urlParams = extractKeyValuesFromString(window.location.search);

      if (!urlParams.code) {
        window.location = `${GITHUB_URL}/login/oauth/authorize?client_id=${clientId}`;
      } else if (urlParams.code) {
        get(
          `${GITHUB_URL}/login/oauth/access_token?code=${
            urlParams.code
          }&client_id=${clientId}&client_secret=${clientSecret}`
        )
          .then(response => response.text())
          .then(res => {
            const params = extractKeyValuesFromString(res);

            if (params.access_token) {
              localStorage.setItem('access_token', params.access_token);
            }
          })
          .then(() => this.getUser());
      }
    } else if (!localStorage.getItem('user')) {
      this.getUser();
    }
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
