import React from 'react';
import PropTypes from 'prop-types';
import { AlertOctagon, Info } from 'react-feather';

import { childrenType } from '../../proptypes';
import {
  ErrorWrapper,
  InfoWrapper,
  Text,
  WarningWrapper,
} from './InfoBannerSC';

const InfoBannerComponent = ({ children, type }) => {
  const Wrapper =
    type === 'warning'
      ? WarningWrapper
      : type === 'info'
      ? InfoWrapper
      : ErrorWrapper;

  const Icon = type === 'warning' || type === 'info' ? Info : AlertOctagon;

  return (
    <Wrapper>
      <Icon size="16" strokeWidth="2" />
      <Text>{children}</Text>
    </Wrapper>
  );
};

InfoBannerComponent.propTypes = {
  children: childrenType.isRequired,
  type: PropTypes.string.isRequired,
};

export const InfoBanner = InfoBannerComponent;
