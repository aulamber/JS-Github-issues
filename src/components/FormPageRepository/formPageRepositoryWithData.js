import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import {
  errorSelector,
  setError,
  setLoading,
  loadingSelector,
  repositoriesSelector,
  setRepositories,
} from '../../store/data';
import { accessTokenSelector } from '../../store/authentication';
import { getRepositories } from '../../requests/repositories';
import { FormPageRepository as FormPageRepositoryComponent } from './FormPageRepository';

const mapStateToProps = state => ({
  accessToken: accessTokenSelector(state),
  error: errorSelector(state),
  loading: loadingSelector(state),
  repositories: repositoriesSelector(state),
});

const mapDispatchToProps = {
  setError,
  setLoading,
  setRepositories,
};

export const FormPageRepository = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withHandlers({
    fetchRepositories: ({ accessToken, setRepositories }) => () => {
      setLoading(true);

      getRepositories(accessToken)
        .then(({ data }) => {
          const repositories =
            data && data.length
              ? data.map(({ id, name }) => ({ id, name }))
              : [];

          setRepositories(repositories);
          setLoading(true);
          setError('');
        })
        .catch(err => {
          setRepositories([]);
          localStorage.setItem('repository', '');
          setLoading(true);
          setError(err);
        });
    },
  }),

  lifecycle({
    componentDidMount() {
      if (this.props.accessToken) {
        this.props.fetchRepositories();
      }
    },
  })
)(FormPageRepositoryComponent);
