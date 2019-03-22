import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import {
  errorSelector,
  loadingSelector,
  setError,
  setLoading,
  setRepositories,
} from '../../store/data';
import {
  accessTokenSelector,
  resetAccessToken,
  setAccessToken,
} from '../../store/authentication';
import { authenticateUser } from '../../requests/authentication';
import { getUser } from '../../requests/user';
import { App as AppComponent } from './App';

const mapStateToProps = state => ({
  accessToken: accessTokenSelector(state),
  error: errorSelector(state),
  loading: loadingSelector(state),
});

const mapDispatchToProps = {
  resetAccessToken,
  setAccessToken,
  setRepositories,
  setError,
  setLoading,
};

export const App = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  lifecycle({
    componentDidMount() {
      this.props.setLoading(true);

      authenticateUser()
        .then(accessToken => {
          this.props.setAccessToken(accessToken);
          localStorage.setItem('access_token', accessToken);
        })
        .then(() => getUser())
        .then(res => {
          localStorage.setItem('user', res.data.login);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('avatar_url', res.data.avatar_url);
          localStorage.setItem('personal_github_url', res.data.html_url);

          this.props.setLoading(false);
          setError('');
        })
        .catch(err => {
          this.props.setLoading(false);
          this.props.setError(`${err}. Refresh to try again.`);
        });
    },
  })
)(AppComponent);
