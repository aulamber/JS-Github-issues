import React from 'react';

import { MainLoaderWrapper, MainLoader, Wrapper } from './Loader.style.js';

export const Loader = () => (
  <Wrapper>
    <MainLoaderWrapper>
      <MainLoader />
    </MainLoaderWrapper>
  </Wrapper>
);
