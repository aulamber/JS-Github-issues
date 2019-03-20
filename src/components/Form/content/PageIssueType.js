import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { Grid, MenuItem, withStyles } from '@material-ui/core';
import { Select } from 'final-form-material-ui';

import { Wizard } from '../../Wizard';

export const PageIssueTypeComponent = ({ classes }) => (
  <Wizard.Page>
    <Grid item xs={12}>
      <Field
        fullWidth
        name="label"
        component={Select}
        label="Type of issue"
        className={classes.select}
        formControlProps={{ fullWidth: true }}
      >
        <MenuItem value="featureRequest">Feature Request</MenuItem>
        <MenuItem value="bug">Bug</MenuItem>
      </Field>

      <OnChange name="label">
        {value => {
          localStorage.setItem('label', value);
        }}
      </OnChange>
    </Grid>
  </Wizard.Page>
);

PageIssueTypeComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export const PageIssueType = withStyles(
  {
    select: {
      minWidth: '340px',
      textAlign: 'left',
    },
  },
  { withTheme: true }
)(PageIssueTypeComponent);
