import { compose, withHandlers, withProps } from 'recompose';
import { connect } from 'react-redux';

import {
  errorSelector,
  loadingSelector,
  repositoriesSelector,
  setError,
  setLoading,
  setNewIssueUrl,
  resetData,
} from '../../store/data';
import { accessTokenSelector } from '../../store/authentication';
import { createIssue } from '../../requests/issues';
import { Form as FormComponent } from './Form';

const mapStateToProps = state => ({
  accessToken: accessTokenSelector(state),
  error: errorSelector(state),
  loading: loadingSelector(state),
  repositories: repositoriesSelector(state),
});

const mapDispatchToProps = {
  resetData,
  setError,
  setLoading,
  setNewIssueUrl,
};

export const Form = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withProps(props => {
    return {
      ...props,
      initialValues: {
        owner: localStorage.getItem('owner'),
        repository: localStorage.getItem('repository'),
        label: localStorage.getItem('label'),
        title: { label: localStorage.getItem('title') },
        description_featureRequest: localStorage.getItem(
          'description_featureRequest'
        ),
        description_bug: localStorage.getItem('description_bug'),
        version: localStorage.getItem('version'),
      },
    };
  }),

  withHandlers({
    onSubmit: ({ resetData, setError, setLoading, setNewIssueUrl }) => ({
      title,
      ...values
    }) => {
      const { owner, repository } = values;
      const valuesToSubmit = {
        title: title.label,
        body:
          values.label === 'bug'
            ? `${values.description_bug}\n\nVersion: ${values.version}`
            : values.description_featureRequest,
        labels: [values.label],
      };

      setLoading(true);

      createIssue(owner, repository, valuesToSubmit)
        .then(({ data }) => {
          resetData();
          setNewIssueUrl(data.html_url);
          setLoading(false);
          setError('');

          localStorage.removeItem('owner');
          localStorage.removeItem('repository');
          localStorage.removeItem('label');
          localStorage.removeItem('title');
          localStorage.removeItem('description_featureRequest');
          localStorage.removeItem('description_bug');
          localStorage.removeItem('version');
        })
        .catch(err => {
          setError(`${err}. Refresh to try again.`);
          setLoading(false);
        });
    },
  })
)(FormComponent);
