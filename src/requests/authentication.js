import { get } from './httpMethods';
import { GITHUB_URL } from '../constants/baseUrl';

export function requestUserIdentity() {
  return get(
    `${GITHUB_URL}/login/oauth/authorize?client_id=4ee24da68e1ac5ab126e`
  )
    .then(() => {
      window.location = `${GITHUB_URL}/login/oauth/authorize?client_id=4ee24da68e1ac5ab126e`;
    })
    .then(response => console.log('response = ', response))
    .catch(err => console.log('login err = ', err));
}

// Stepper joli : https://material-ui.com/demos/steppers/
// Card jolie : https://material-ui.com/demos/cards/
// Sign in : https://material-ui.com/getting-started/page-layout-examples/sign-in/
// + https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/page-layout-examples/sign-in/SignIn.js
// app bar : https://material-ui.com/demos/app-bar/

// Doc github
// authent : https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
// user : https://developer.github.com/v3/users/
// issues : https://developer.github.com/v3/issues/#list-issues-for-a-repository
// auth0 : https://auth0.com/authenticate/react/facebook/

// Local-AmblerTest
// http://192.168.43.204:3000

// client id : 4ee24da68e1ac5ab126e
// client secret : 54e0078bac3e7e4949d0c5fa7401d78a2df203f9
