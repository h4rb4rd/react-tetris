import { TETROMINOS } from '../constants/common';

export type StageCellType = [keyof typeof TETROMINOS, string];
export type StageType = StageCellType[][];
