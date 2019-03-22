import React from 'react';

import { AppBar } from '../AppBar';
import { Form } from '../Form';
import { Loader } from '../Loader';
import { InfoBanner } from '../InfoBanner';
import { Wrapper, ContentWrapper } from './App.style';

export function App({ accessToken, error, loading }) {
  return (
    <Wrapper>
      <AppBar />

      {error && <InfoBanner type="error">{error}</InfoBanner>}

      {accessToken && (
        <ContentWrapper hasErrorBanner={!!error}>
          {loading && <Loader />}
          <Form disabled={!!error} />
        </ContentWrapper>
      )}
    </Wrapper>
  );
}
