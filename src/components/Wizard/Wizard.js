import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Button } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { Content, EmptyDiv } from './Wizard.style';

class WizardComponent extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {},
    };
  }

  next = values => {
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));
  };

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];

    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values, isInvalid) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values, isInvalid);
    }
  };

  render() {
    const { children, classes, theme } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const maxSteps = React.Children.count(children);
    const isLastPage = page === React.Children.count(children) - 1;

    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Content>
                <EmptyDiv />

                <div>{activePage}</div>

                {isLastPage && (
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    SUBMIT
                  </Button>
                )}

                <MobileStepper
                  steps={maxSteps}
                  activeStep={page}
                  position="static"
                  className={classes.mobileStepper}
                  nextButton={
                    <Button
                      size="small"
                      type="submit"
                      disabled={page === maxSteps - 1}
                    >
                      Next
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      type="button"
                      size="small"
                      onClick={this.previous}
                      disabled={page === 0}
                    >
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />

                {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
              </Content>
            </form>
          );
        }}
      </Form>
    );
  }
}

WizardComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  initialValues: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export const Wizard = withStyles(
  {
    mobileStepper: {
      backgroundColor: 'transparent',
      marginTop: '30px',
      marginBottom: '-16px',
    },
  },
  { withTheme: true }
)(WizardComponent);
