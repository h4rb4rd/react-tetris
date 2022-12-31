import { useState } from 'react';
import styled from 'styled-components';

import { createStage } from './utils/gameHelpers';
import Display from './components/Display';
import Stage from './components/Stage';
import StartButton from './components/StartButton';

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
  padding: 40px;
  margin: 0 auto;
  .display {
    display: flex;
    justify-content: space-between;
    width: 380px;
  }
`;

function App() {
  const [dropTime, setDropTime] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState(true);

  return (
    <StyledTetrisWrapper role="button" tabIndex={0}>
      <StyledTetris>
        <div className="display">
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text="Game Over!" />
              <StartButton callback={() => null}></StartButton>
            </>
          ) : (
            <>
              <Display text={`Score: `} />
              <Display text={`Rows: `} />
              <Display text={`Level: `} />
            </>
          )}
        </div>
        <Stage stage={createStage()} />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}

export default App;
