import { memo } from 'react';
import styled from 'styled-components';

import { TETROMINOS } from '../constants/common';

type Props = {
  type: keyof typeof TETROMINOS;
  color: string;
};

const StyledCell = styled.div<Props>`
  width: auto;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) => (props.type === 0 ? '0px solid' : '4px solid')};
  border-bottom-color: rgba(${(props) => props.color}, 0.1);
  border-right-color: rgba(${(props) => props.color}, 1);
  border-top-color: rgba(${(props) => props.color}, 1);
  border-left-color: rgba(${(props) => props.color}, 0.3);
`;

const Cell = ({ type }: Props) => {
  return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

export default memo(Cell);
