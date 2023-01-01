import { useRef, useState } from 'react';
import styled from 'styled-components';

import { createStage, isColliding } from './utils/gameHelpers';
import Display from './components/Display';
import Stage from './components/Stage/Stage';
import StartButton from './components/StartButton';
import { useInterval } from './hooks/useInterval';
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useStage';

const StyledTetrisWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  outline: none;
`;

const StyledTetris = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 10 0px;
  padding: 40px;
  .display {
    display: flex;
    justify-content: space-between;
    width: 380px;
  }
`;

function App() {
  const [dropTime, setDropTime] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState(true);
  const { player, updatePlayerPosition, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage } = useStage(player, resetPlayer);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const movePlayer = (dir: number) => {
    if (!isColliding(player, stage, { x: dir, y: 0 })) {
      updatePlayerPosition({ x: dir, y: 0, collided: false });
    }
  };

  const handleKeyUp = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === 40) {
      setDropTime(1000);
    }
  };

  const handleStartGame = () => {
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }

    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
  };

  const move = ({ keyCode, repeat }: { keyCode: number; repeat: boolean }): void => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        if (repeat) {
          return;
        }
        setDropTime(30);
      } else if (keyCode === 38) {
        playerRotate(stage);
      }
    }
  };

  const drop = (): void => {
    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      if (player.position.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper ref={gameAreaRef} role="button" tabIndex={0} onKeyDown={move} onKeyUp={handleKeyUp}>
      <StyledTetris>
        <div className="display">
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text="Game Over!" />
              <StartButton handleClick={handleStartGame}></StartButton>
            </>
          ) : (
            <>
              <Display text={`Score: `} />
              <Display text={`Rows: `} />
              <Display text={`Level: `} />
            </>
          )}
        </div>
        <Stage stage={stage} />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}

export default App;
