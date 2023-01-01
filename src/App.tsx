import { useRef, useState } from 'react';
import styled from 'styled-components';

import { createStage, isColliding } from './utils/gameHelpers';
import Display from './components/Display';
import Stage from './components/Stage/Stage';
import StartButton from './components/StartButton';
import { useInterval } from './hooks/useInterval';
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useStage';
import { useGameStatus } from './hooks/useGameStatus';

const StyledTetrisWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  outline: none;
`;

const StyledTetris = styled.div`
  position: relative;
  top: -70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  const { stage, rowsCleared, setStage } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const movePlayer = (dir: number) => {
    if (!isColliding(player, stage, { x: dir, y: 0 })) {
      updatePlayerPosition({ x: dir, y: 0, collided: false });
    }
  };

  const handleKeyUp = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === 40) {
      setDropTime(1000 / level + 200);
    }
  };

  const handleStartGame = () => {
    if (gameAreaRef.current) {
      gameAreaRef.current.focus();
    }

    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
  };

  const move = ({ keyCode, repeat }: { keyCode: number; repeat: boolean }) => {
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

  const drop = () => {
    if (rows > level * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / level + 200);
    }

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
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </>
          )}
        </div>
        <Stage stage={stage} />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}

export default App;
