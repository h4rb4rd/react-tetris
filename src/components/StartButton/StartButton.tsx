import { StyledStartButton } from './StartButton.styles';

interface StartButtonProps {
  handleClick: () => void;
}

const StartButton = ({ handleClick }: StartButtonProps) => {
  return <StyledStartButton onClick={handleClick}>Start Game</StyledStartButton>;
};

export default StartButton;
