import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { Wizard } from '../Wizard';

const FormPageSummaryComponent = ({ classes, theme }) => {
  const label = localStorage.getItem('label');
  const title = localStorage.getItem('title');
  const description =
    label === 'bug'
      ? localStorage.getItem('description_bug')
      : localStorage.getItem('description_featureRequest');
  const version = localStorage.getItem('version');

  return (
    <Wizard.Page>
      <div>
        {/* <label>Issue review</label>

      <h3>Title: {localStorage.getItem('title')}</h3> */}

        <div className={classes.root}>
          <div className={classes.section1}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  Summary
                </Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              Please review this issue before submitting.
            </Typography>
          </div>

          <Divider variant="middle" />

          <div className={classes.section2}>
            <Typography gutterBottom variant="body1">
              Type
            </Typography>
            <div>
              <Chip className={classes.chip} label={label} />
            </div>
          </div>

          <Divider variant="middle" />

          <List>
            <ListItem>
              <ListItemText primary="Title" secondary={title} />
            </ListItem>

            <Divider variant="middle" />

            <ListItem>
              <ListItemText primary="Description" secondary={description} />
            </ListItem>

            {version && (
              <div>
                <Divider variant="middle" />

                <ListItem>
                  <ListItemText primary="Version" secondary={version} />
                </ListItem>
              </div>
            )}
          </List>
        </div>
      </div>
    </Wizard.Page>
  );
};

export const FormPageSummary = withStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'transparent',
    borderRadius: '4%',
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  section1: {
    padding: '18px',
  },
  section2: {
    margin: theme.spacing.unit * 2,
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`,
  },
}))(FormPageSummaryComponent);
