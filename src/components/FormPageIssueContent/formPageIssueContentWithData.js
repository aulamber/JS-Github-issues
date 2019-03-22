import { compose, withStateHandlers, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { deburr, trim, toLower } from 'lodash';

import {
  errorSelector,
  setError,
  setLoading,
  loadingSelector,
  repositoriesSelector,
  setRepositories,
} from '../../store/data';
import { accessTokenSelector } from '../../store/authentication';
import { getIssues } from '../../requests/issues';
import { FormPageIssueContent as FormPageIssueContentComponent } from './FormPageIssueContent';

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

export const FormPageIssueContent = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withStateHandlers(
    ({ initialIssues = [] }) => ({
      issues: initialIssues,
    }),
    {
      setIssues: () => issues => ({ issues }),
    }
  ),

  withHandlers({
    loadIssues: ({ setError, setIssues, setLoading }) => search => {
      return getIssues()
        .then(({ data }) => {
          const issues = data
            .map(({ id, title }) => ({ id, label: title }))
            .filter(elem => {
              return deburr(toLower(trim(elem.label))).includes(
                deburr(toLower(trim(search)))
              );
            });

          setIssues(issues);
          setLoading(false);
          setError('');

          return issues;
        })
        .catch(err => {
          setError(`${err}`);
          setLoading(false);
        });
    },
  })
)(FormPageIssueContentComponent);
