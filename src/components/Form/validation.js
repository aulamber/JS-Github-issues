export const validation = {
  pageOwner: values => {
    const errors = {};

    if (!values.owner) {
      errors.owner = 'Required';
    }

    return errors;
  },

  pageRepository: values => {
    const errors = {};

    if (!values.repository) {
      errors.repository = 'Required';
    }

    return errors;
  },

  pageIssueType: values => {
    const errors = {};

    if (!values.label) {
      errors.label = 'Required';
    }

    return errors;
  },

  pageIssueContent: values => {
    const errors = {};

    if (!values.title || !values.title.label) {
      errors.title = 'Required';
    }
    if (
      values.label === 'featureRequest' &&
      !values.description_featureRequest
    ) {
      errors.description_featureRequest = 'Required';
    }
    if (values.label === 'bug' && !values.description_bug) {
      errors.description_bug = 'Required';
    }
    if (values.label === 'bug' && !values.version) {
      errors.version = 'Required';
    }
    if (
      values.label === 'bug' &&
      values.version &&
      !/^\d+\.\d$/.test(values.version)
    ) {
      errors.version = 'Format must be XX(...).X';
    }
    return errors;
  },
};
