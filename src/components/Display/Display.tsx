import { StyledDisplay } from './Display.styles';

interface DisplayProps {
  text: string;
  gameOver?: boolean;
}

const Display = ({ text, gameOver }: DisplayProps) => {
  return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>;
};

export default Display;
