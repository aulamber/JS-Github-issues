import styled from 'styled-components';
import { CenterXY } from '../Flex';

export const Wrapper = styled.div`
  background-color: #eeeeee;
  min-height: calc(100vh);
`;

export const ContentWrapper = styled(CenterXY)`
  min-height: ${props =>
    props.hasErrorBanner ? 'calc(100vh - 120px)' : 'calc(100vh)'};
  margin-top: ${props => (props.hasErrorBanner ? '-20px' : '-56px')};
`;
