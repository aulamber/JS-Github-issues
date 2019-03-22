import styled from 'styled-components';

import { RowCenterY } from '../Flex';

const Wrapper = styled(RowCenterY)`
  height: 56px;
  padding-left: 20px;
  width: 100%;
`;

export const ErrorWrapper = styled(Wrapper)`
  background-color: #fdeaee;
  color: #ed2e52;
`;

export const WarningWrapper = styled(Wrapper)`
  background-color: #fdf1e5;
  color: #ff6347;
`;

export const InfoWrapper = styled(Wrapper)`
  background-color: #7ec9c8;
  color: #00a86b;
`;

export const Text = styled.div`
  font-size: 14px;
  padding-left: 5px;
`;
