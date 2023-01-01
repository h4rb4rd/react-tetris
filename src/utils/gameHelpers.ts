import { PlayerType, StageType } from './../types/commont';
import { STAGE_WIDTH, STAGE_HEIGHT } from '../constants/common';
import { TETROMINOS } from '../constants/common';

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

export const randomTetromino = () => {
  const tetrominos = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as (keyof typeof TETROMINOS)[];
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

export const isColliding = (player: PlayerType, stage: StageType, { x: moveX, y: moveY }: { x: number; y: number }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        if (
          !stage[y + player.position.y + moveY] ||
          !stage[y + player.position.y + moveY][x + player.position.x + moveX] ||
          stage[y + player.position.y + moveY][x + player.position.x + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }

  return false;
};
