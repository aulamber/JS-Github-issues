import React from 'react';
import PropTypes from 'prop-types';

import { Wizard } from '../Wizard';
import { FormPageOwner } from '../FormPageOwner';
import { FormPageRepository } from '../FormPageRepository';
import { FormPageIssueType } from '../FormPageIssueType';
import { FormPageIssueContent } from '../FormPageIssueContent';
import { FormPageSummary } from '../FormPageSummary';
import { FormStyle } from './Form.style';
import { validation } from './validation';

const FormComponent = ({
  disabled,
  getAccessToken,
  getRepositories,
  initialValues,
  onSubmit,
}) => {
  return (
    <FormStyle>
      <Wizard
        initialValues={initialValues}
        onSubmit={onSubmit}
        disabled={disabled}
      >
        <FormPageOwner validate={validation.pageOwner} />

        <FormPageRepository validate={validation.pageRepository} />

        <FormPageIssueType validate={validation.pageIssueType} />

        <FormPageIssueContent validate={validation.pageIssueContent} />

        <FormPageSummary />
      </Wizard>
    </FormStyle>
  );
};

FormComponent.propTypes = {
  disabled: PropTypes.bool.isRequired,
  getRepositories: PropTypes.func.isRequired,
  initialValues: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export const Form = FormComponent;
