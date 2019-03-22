import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { ExternallyChanged, OnChange } from 'react-final-form-listeners';
import { Grid, MenuItem, withStyles } from '@material-ui/core';
import { Select } from 'final-form-material-ui';

import { Wizard } from '../Wizard';

export function FormPageRepositoryComponent({ classes, repositories }) {
  const mapRepositories = repositories.length ? (
    repositories.map(repo => (
      <MenuItem key={repo.id} value={repo.name}>
        {repo.name}
      </MenuItem>
    ))
  ) : (
    <MenuItem key="none">
      No repo found for this user. Please change the user name.
    </MenuItem>
  );

  return (
    <Wizard.Page>
      <Grid container alignItems="flex-start" spacing={8}>
        <Grid item xs={12}>
          <Field
            name="repository"
            component={Select}
            label="Repository"
            className={classes.select}
          >
            {mapRepositories}
          </Field>

          <OnChange name="repository">
            {value => {
              localStorage.setItem('repository', value);
            }}
          </OnChange>

          <ExternallyChanged name="owner">
            {(...args) => {
              console.log('args = ', args);
              return null;
            }}
          </ExternallyChanged>
        </Grid>
      </Grid>
    </Wizard.Page>
  );
}

FormPageRepositoryComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  repositories: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
};

export const FormPageRepository = withStyles(
  {
    select: {
      minWidth: '340px',
      textAlign: 'left',
    },
  },
  { withTheme: true }
)(FormPageRepositoryComponent);
