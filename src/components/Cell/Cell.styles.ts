import styled from 'styled-components';

import { TETROMINOS } from '../../constants/common';

interface StyledCellProps {
  color: string;
  type: keyof typeof TETROMINOS;
}

export const StyledCell = styled.div<StyledCellProps>`
  width: auto;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) => (props.type === 0 ? '0px solid' : '4px solid')};
  border-bottom-color: rgba(${(props) => props.color}, 0.1);
  border-right-color: rgba(${(props) => props.color}, 1);
  border-top-color: rgba(${(props) => props.color}, 1);
  border-left-color: rgba(${(props) => props.color}, 0.3);
`;
