import React from 'react';
import {
  compose,
  setStatic,
  withHandlers,
  withProps,
  withStateHandlers,
} from 'recompose';

import { Wizard as WizardComponent } from './Wizard';

export const Wizard = compose(
  setStatic('Page', ({ children }) => children),

  withStateHandlers(
    ({
      initialPage = 0,
      initialValues = props => props.initialValues || {},
    }) => ({
      page: initialPage,
      values: initialValues,
    }),
    {
      setPage: () => page => ({ page }),
      setState: () => state => state,
    }
  ),

  withProps(props => {
    return {
      ...props,
      activePage: React.Children.toArray(props.children)[props.page],
      maxSteps: React.Children.count(props.children),
      isLastPage: props.page === React.Children.count(props.children) - 1,
    };
  }),

  withHandlers({
    handleSubmit: ({ children, onSubmit, page, setState }) => values => {
      const next = values => {
        setState({
          page: Math.min(page + 1, children.length - 1),
          values,
        });
      };

      const isLastPage = page === React.Children.count(children) - 1;

      if (isLastPage) {
        return onSubmit(values);
      } else {
        next(values);
      }
    },

    previous: ({ page, setPage }) => () => {
      setPage(Math.max(page - 1, 0));
    },

    validate: ({ activePage }) => values => {
      return activePage.props.validate ? activePage.props.validate(values) : {};
    },
  })
)(WizardComponent);
