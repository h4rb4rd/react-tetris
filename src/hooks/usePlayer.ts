import { PlayerType } from './../types/commont';
import { randomTetromino } from './../utils/gameHelpers';
import { STAGE_WIDTH } from './../constants/common';
import { useCallback, useState } from 'react';

type PlayerPositionType = { x: number; y: number; collided: boolean };

export const usePlayer = () => {
  const [player, setPlayer] = useState({} as PlayerType);

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
  };
};
