import styled from 'styled-components';

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
  return (
    <StyledTetrisWrapper role="button" tabIndex={0}>
      <StyledTetris>Start here!</StyledTetris>
    </StyledTetrisWrapper>
  );
}

export default App;
