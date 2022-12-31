import { memo } from 'react';

import { StyledCell } from './Cell.styles';
import { TETROMINOS } from '../../constants/common';

interface CellProps {
  type: keyof typeof TETROMINOS;
}

const Cell = ({ type }: CellProps) => {
  return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

export default memo(Cell);
