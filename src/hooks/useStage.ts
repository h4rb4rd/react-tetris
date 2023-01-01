import { createStage } from './../utils/gameHelpers';
import { PlayerType, CellType } from './../types/commont';
import { useEffect, useState } from 'react';

export const useStage = (player: PlayerType, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    if (!player.position) {
      return;
    }

    const updateStage = (prevStage: CellType[][]): CellType[][] => {
      const newStage = prevStage.map(
        (row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)) as CellType[],
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.position.y][x + player.position.x] = [value, `${player.collided ? 'merged' : 'clear'}`];
          }
        });
      });

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player.collided, player.position?.x, player.position?.y, player.tetromino]);

  return { stage, setStage };
};
