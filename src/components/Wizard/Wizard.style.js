import styled from 'styled-components';

import { ColumnCenterX } from '../Flex';

export const Content = styled(ColumnCenterX)`
  height: calc(100vh - 104px);
  min-width: 340px;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const EmptyDiv = styled.div`
  height: 50px;
`;
