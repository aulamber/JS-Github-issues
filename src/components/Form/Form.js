import React from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { TextField } from 'final-form-material-ui';
import { Grid, withStyles } from '@material-ui/core';

import { post } from '../../requests/httpMethods';
import { FormStyle } from './Form.style';
import { Wizard } from '../Wizard';
import { PageOwner } from './content/PageOwner';
import { PageRepository } from './content/PageRepository';
import { PageIssueType } from './content/PageIssueType';
import { PageIssueContent } from './content/PageIssueContent';
import { PageSummary } from './content/PageSummary';

const onSubmit = ({ title, ...values }) => {
  console.log({ values, valuesToSubmit });

  const valuesToSubmit = {
    assignee: localStorage.getItem('user'),
    title: title.label,
    body:
      values.label === 'bug'
        ? `${values.description_bug}↵↵Version: ${values.version}`
        : values.description_featureRequest,
    labels: [values.label],
  };

  // https://developer.github.com/v3/issues/#create-an-issue

  post(
    `/api/repos/${values.owner}/${
      values.repository
    }/issues?access_token=${localStorage.getItem('access_token')}`,
    valuesToSubmit
  )
    .then(res => console.log('res = ', res))
    .catch(err => console.log('err = ', err));

  console.log({ values, valuesToSubmit });

  // localStorage.removeItem('owner');
  // localStorage.removeItem('repository');
  // localStorage.removeItem('label');
  // localStorage.removeItem('title');
  // localStorage.removeItem('description_featureRequest');
  // localStorage.removeItem('description_bug');
  // localStorage.removeItem('version');
};

export const Form = () => {
  const initialValues = {
    owner: localStorage.getItem('owner'),
    repository: localStorage.getItem('repository'),
    label: localStorage.getItem('label'),
    title: { label: localStorage.getItem('title') },
    description_featureRequest: localStorage.getItem(
      'description_featureRequest'
    ),
    description_bug: localStorage.getItem('description_bug'),
    version: localStorage.getItem('version'),
  };

  return (
    <FormStyle>
      <Wizard initialValues={initialValues} onSubmit={onSubmit}>
        <PageOwner
          validate={values => {
            const errors = {};
            if (!values.owner) {
              errors.owner = 'Required';
            }
            return errors;
          }}
        />
        <PageRepository
          validate={values => {
            const errors = {};

            if (!values.repository) {
              errors.repository = 'Required';
            }

            return errors;
          }}
        />

        <PageIssueType
          validate={values => {
            const errors = {};

            if (!values.label) {
              errors.label = 'Required';
            }

            return errors;
          }}
        />

        <PageIssueContent
          validate={values => {
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
          }}
        />

        <PageSummary />
      </Wizard>
    </FormStyle>
  );
};
