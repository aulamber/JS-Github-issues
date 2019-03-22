import styled from 'styled-components';

import { ColumnCenterX } from '../Flex';

export const Content = styled(ColumnCenterX)`
  min-height: ${props => props.minHeight};
  min-width: 340px;
  justify-content: space-between;
`;

export const EmptyDiv = styled.div`
  height: 50px;
`;
