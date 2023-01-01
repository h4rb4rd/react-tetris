import { useEffect, useState } from 'react';

import { CellType, PlayerType } from './../types/commont';
import { createStage } from '../utils/gameHelpers';

export const useStage = (player: PlayerType, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    if (!player.position) return;

    setRowsCleared(0);

    const sweepRows = (newStage: CellType[][]): CellType[][] => {
      return newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);

          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']) as CellType[]);
          return ack;
        }

        ack.push(row);
        return ack;
      }, [] as CellType[][]);
    };

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

      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player.collided, player.position?.x, player.position?.y, player.tetromino]);

  return { stage, setStage, rowsCleared };
};
