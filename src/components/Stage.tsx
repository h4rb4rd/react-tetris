import styled from 'styled-components';

import Cell from './Cell';
import { STAGE_WIDTH, STAGE_HEIGHT } from '../constants/common';
import { StageType } from '../types/commont';

const StyledStage = styled.div`
  display: grid;
  grid-template-columns: repeat(${STAGE_WIDTH}, 30px);
  grid-template-rows: repeat(${STAGE_HEIGHT}, 30px);
  grid-gap: 1px;
  border: 1px solid #777;
  background: #222;
`;

type Props = {
  stage: StageType;
};

const Stage = ({ stage }: Props) => {
  return <StyledStage>{stage.map((row) => row.map((cell, i) => <Cell key={i} type={cell[0]} />))}</StyledStage>;
};

export default Stage;
