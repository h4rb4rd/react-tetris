import Cell from '../Cell';
import { StageType } from '../../types/commont';
import { StyledStage } from './Stage.styles';

interface StyledStageProps {
  stage: StageType;
}

const Stage = ({ stage }: StyledStageProps) => {
  return <StyledStage>{stage.map((row) => row.map((cell, i) => <Cell key={i} type={cell[0]} />))}</StyledStage>;
};

export default Stage;
