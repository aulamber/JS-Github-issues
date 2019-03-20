import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import GithubIcon from 'react-feather/dist/icons/github';

import { appBarStyle } from './AppBar.style';

function AppBarComponent({ classes }) {
  return (
    <MUIAppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Submit issues to GitHub
        </Typography>

        <a href={localStorage.getItem('personal_github_url')}>
          <GithubIcon color="#FFF" />
        </a>
      </Toolbar>
    </MUIAppBar>
  );
}

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const AppBar = withStyles(appBarStyle, { withTheme: true })(
  AppBarComponent
);
