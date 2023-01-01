import { TETROMINOS } from '../constants/common';

export type StageCellType = [keyof typeof TETROMINOS, string];
export type StageType = StageCellType[][];
export type CellType = [string | number, string];

export type PlayerType = {
  position: {
    x: number;
    y: number;
  };
  tetromino: (string | number)[][];
  collided: boolean;
};
