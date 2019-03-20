import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { TextField } from 'final-form-material-ui';
// import CreatableSelect from 'react-select/lib/Creatable';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import {
  Chip,
  Grid,
  MenuItem,
  Paper,
  TextField as TextFieldMUI,
  Typography,
  withStyles,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import { get } from '../../../requests/httpMethods';
import { Wizard } from '../../Wizard';

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

const NoOptionsMessage = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const inputComponent = ({ inputRef, ...props }) => (
  <div ref={inputRef} {...props} />
);

const Control = props => {
  return (
    <TextFieldMUI
      fullWidth
      label={props.selectProps.label}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
};

const Option = props => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400,
      overflow: 'auto',
    }}
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
);

const Placeholder = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.placeholder}
    {...props.innerProps}
  />
);

const SingleValue = props => (
  <Typography
    className={props.selectProps.classes.singleValue}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const ValueContainer = props => (
  <div className={props.selectProps.classes.valueContainer}>
    {props.children}
  </div>
);

const MultiValue = props => (
  <Chip
    tabIndex={-1}
    label={props.children}
    className={classNames(props.selectProps.classes.chip, {
      [props.selectProps.classes.chipFocused]: props.isFocused,
    })}
    onDelete={props.removeProps.onClick}
    deleteIcon={<CancelIcon {...props.removeProps} />}
  />
);

const Menu = props => (
  <Paper
    square
    className={props.selectProps.classes.paper}
    {...props.innerProps}
  >
    {props.children}
  </Paper>
);

const components = {
  Control,
  Menu,
  MultiValue,
  Placeholder,
  NoOptionsMessage,
  Option,
  SingleValue,
  ValueContainer,
};

export class PageIssueContentComponent extends Component {
  state = {
    options: [],
  };

  componentDidMount() {
    this.getExistingIssueTitles();
  }

  getExistingIssueTitles = () => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const owner = localStorage.getItem('owner');
      const repo = localStorage.getItem('repository');

      get(
        `https://api.github.com/repos/${owner}/${repo}/issues?access_token=${localStorage.getItem(
          'access_token'
        )}`
      )
        .then(res => res.json())
        .then(res => {
          if (res && res.length) {
            const issues = res.map(({ id, title }) => ({ id, label: title }));

            this.setState({ options: issues });
          }
        })
        .catch(err => console.log('err = ', err));
    }
  };

  render() {
    const { classes, theme } = this.props;
    const { options } = this.state;

    const promiseOptions = inputValue =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(options);
        }, 1000);
      });

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <Wizard.Page>
        <Grid item xs={12} className={classes.textField}>
          <Field
            name="title"
            type="text"
            render={props => {
              return (
                <AsyncCreatableSelect
                  classes={classes}
                  styles={selectStyles}
                  options={options}
                  cacheOptions
                  defaultOptions
                  loadOptions={promiseOptions}
                  components={components}
                  isRtl={false}
                  value={props.input.value}
                  label="Title"
                  isClearable
                  onChange={newValue => {
                    props.input.onChange(newValue);
                    localStorage.setItem(
                      'title',
                      newValue ? newValue.label : ''
                    );
                  }}
                  onInputChange={newValue => {
                    this.getExistingIssueTitles();
                    // localStorage.setItem(
                    //   'title',
                    //   newValue ? newValue.label : ''
                    // );
                  }}
                />
              );
            }}
          />

          <OnChange name="title">
            {value => {
              console.log('value = ', value);
              localStorage.setItem('title', value ? value.label : '');
            }}
          </OnChange>
        </Grid>

        <Condition when="label" is="featureRequest">
          <Grid item xs={12}>
            <Field
              name="description_featureRequest"
              type="text"
              multiline
              label="Description"
              className={classes.textField}
              component={TextField}
            />

            <OnChange name="description_featureRequest">
              {value => {
                localStorage.setItem('description_featureRequest', value);
              }}
            </OnChange>
          </Grid>
        </Condition>

        <Condition when="label" is="bug">
          <Grid item xs={12}>
            <Field
              name="description_bug"
              multiline
              type="text"
              label="Description"
              className={classes.textField}
              component={TextField}
            />

            <OnChange name="description_bug">
              {value => {
                localStorage.setItem('description_bug', value);
              }}
            </OnChange>
          </Grid>

          <Grid item xs={12}>
            <Field
              name="version"
              type="text"
              label="Version"
              className={classes.textField}
              component={TextField}
            />

            <OnChange name="version">
              {value => {
                localStorage.setItem('version', value);
              }}
            </OnChange>
          </Grid>
        </Condition>
      </Wizard.Page>
    );
  }
}

PageIssueContentComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  theme: PropTypes.shape().isRequired,
};

export const PageIssueContent = withStyles(
  theme => ({
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
    textField: {
      marginBottom: '20px',
      minWidth: '340px',
      width: '100%',
    },
  }),
  { withTheme: true }
)(PageIssueContentComponent);
