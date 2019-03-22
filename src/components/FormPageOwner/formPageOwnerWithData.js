import { compose } from 'recompose';
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
import { FormPageOwner as FormPageOwnerComponent } from './FormPageOwner';

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

export const FormPageOwner = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FormPageOwnerComponent);
