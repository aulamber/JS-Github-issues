import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { Grid, MenuItem, withStyles } from '@material-ui/core';
import { Select } from 'final-form-material-ui';

import { get } from '../../../requests/httpMethods';
import { Wizard } from '../../Wizard';

export class PageRepositoryComponent extends Component {
  state = {
    options: [],
  };

  componentDidMount() {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const owner = localStorage.getItem('owner');

      get(
        `https://api.github.com/users/${owner}/repos?access_token=${localStorage.getItem(
          'access_token'
        )}&type=owner`
      )
        .then(res => res.json())
        .then(res => {
          if (res && res.length) {
            const repositories = res.map(({ id, name }) => ({ id, name }));

            this.setState({ options: repositories });
          }
        })
        .catch(err => console.log('err = ', err));
    }
  }

  render() {
    const { classes } = this.props;
    const { options } = this.state;

    const mapOptions = options.map(option => (
      <MenuItem key={option.id} value={option.name}>
        {option.name}
      </MenuItem>
    ));

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
              {mapOptions}
            </Field>

            <OnChange name="repository">
              {value => {
                localStorage.setItem('repository', value);
              }}
            </OnChange>
          </Grid>
        </Grid>
      </Wizard.Page>
    );
  }
}

PageRepositoryComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export const PageRepository = withStyles(
  {
    select: {
      minWidth: '340px',
      textAlign: 'left',
    },
  },
  { withTheme: true }
)(PageRepositoryComponent);
