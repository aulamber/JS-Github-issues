import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Button } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { Content, EmptyDiv } from './Wizard.style';
import { Row } from '../Flex';

function WizardComponent({
  activePage,
  classes,
  disabled,
  handleSubmit,
  isLastPage,
  maxSteps,
  newIssueUrl,
  onReturnToFirstPage,
  page,
  previous,
  theme,
  validate,
  values,
}) {
  return (
    <Form initialValues={values} validate={validate} onSubmit={handleSubmit}>
      {({ handleSubmit, submitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Content
              minHeight={
                disabled ? 'calc(100vh - 130px)' : 'calc(100vh - 64px)'
              }
            >
              <EmptyDiv />

              <div>{activePage}</div>

              {isLastPage && !newIssueUrl && (
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                  className={classes.button}
                >
                  SUBMIT
                </Button>
              )}

              {newIssueUrl && (
                <Row>
                  <Button
                    href={newIssueUrl}
                    variant="outlined"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                    className={classes.button}
                  >
                    See new issue on Github
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={onReturnToFirstPage}
                    className={classes.button}
                  >
                    Create another issue
                  </Button>
                </Row>
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
                    disabled={
                      disabled || page === maxSteps - 1 || !!newIssueUrl
                    }
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
                    onClick={previous}
                    disabled={page === 0 || !!newIssueUrl}
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
            </Content>
          </form>
        );
      }}
    </Form>
  );
}

WizardComponent.propTypes = {
  activePage: PropTypes.shape().isRequired,
  children: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  classes: PropTypes.shape().isRequired,
  disabled: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape().isRequired,
  isLastPage: PropTypes.bool.isRequired,
  maxSteps: PropTypes.number.isRequired,
  newIssueUrl: PropTypes.string.isRequired,
  onReturnToFirstPage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  theme: PropTypes.shape().isRequired,
  values: PropTypes.shape().isRequired,
};

export const Wizard = withStyles(
  {
    button: {
      border: '1px solid rgba(63, 81, 181, 0.5)',
      color: '#3f51b5',
      fontSize: '12px',
      height: '33px',
    },

    mobileStepper: {
      backgroundColor: 'transparent',
      marginTop: '30px',
    },
  },
  { withTheme: true }
)(WizardComponent);
