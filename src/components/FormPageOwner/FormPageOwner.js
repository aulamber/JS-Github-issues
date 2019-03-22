import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { TextField } from 'final-form-material-ui';
import { Grid, withStyles } from '@material-ui/core';

import { Wizard } from '../Wizard';

const FormPageOwnerComponent = ({ classes, fetchRepositories, validate }) => (
  <Wizard.Page validate={validate}>
    <Grid container alignItems="flex-start" spacing={8}>
      <Grid item xs={12}>
        <Field
          name="owner"
          label="Owner"
          component={TextField}
          type="text"
          className={classes.minWidth}
          fullWidth
        />
        <OnChange name="owner">
          {value => localStorage.setItem('owner', value)}
        </OnChange>
      </Grid>
    </Grid>
  </Wizard.Page>
);

FormPageOwnerComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export const FormPageOwner = withStyles(
  {
    minWidth: {
      minWidth: '340px',
    },
  },
  { withTheme: true }
)(FormPageOwnerComponent);
