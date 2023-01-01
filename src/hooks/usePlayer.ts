import { PlayerType, StageType } from './../types/commont';
import { randomTetromino, isColliding } from './../utils/gameHelpers';
import { STAGE_WIDTH } from './../constants/common';
import { useCallback, useState } from 'react';

type PlayerPositionType = { x: number; y: number; collided: boolean };

export const usePlayer = () => {
  const [player, setPlayer] = useState({} as PlayerType);

  const rotate = (matrix: PlayerType['tetromino']) => {
    const mtrx = matrix.map((_, i) => matrix.map((column) => column[i]));

    return mtrx.map((row) => row.reverse());
  };

  const playerRotate = (stage: StageType): void => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

    const posX = clonedPlayer.position.x;
    let offset = 1;

    while (isColliding(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > clonedPlayer.tetromino[0].length) {
        clonedPlayer.position.x = posX;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPosition = ({ x, y, collided }: PlayerPositionType) => {
    setPlayer((prev) => ({
      ...prev,
      position: { x: (prev.position.x += x), y: (prev.position.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(
    () =>
      setPlayer({
        position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
      }),
    [],
  );

  return {
    player,
    updatePlayerPosition,
    resetPlayer,
    playerRotate,
  };
};
