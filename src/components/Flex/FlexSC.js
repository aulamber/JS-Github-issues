import styled from 'styled-components';

/* Column */

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColumnCenterX = styled(Column)`
  align-items: center;
`;

export const ColumnCenterY = styled(Column)`
  justify-content: center;
`;

/* Row */

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RowCenterX = styled(Row)`
  justify-content: center;
`;

export const RowCenterY = styled(Row)`
  align-items: center;
`;

/* Both */

export const CenterXY = styled(Column)`
  align-items: center;
  justify-content: center;
`;
