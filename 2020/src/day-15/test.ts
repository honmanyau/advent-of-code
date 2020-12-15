import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  play,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 15: Rambunctious Recitation (Part 1)', () => {
  describe(`play()`, () => {
    it([
      `should return 0 for the 1st turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 1);

      assert.strictEqual(solution, 0);
    });

    it([
      `should return 3 for the 2nd turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 2);

      assert.strictEqual(solution, 3);
    });

    it([
      `should return 6 for the 3rd turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 3);

      assert.strictEqual(solution, 6);
    });

    it([
      `should return 0 for the 4th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 4);

      assert.strictEqual(solution, 0);
    });

    it([
      `should return 4 - 1 = 3 for the 5th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 5);

      assert.strictEqual(solution, 4 - 1);
    });

    it([
      `should return 3 for the 6th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 6);

      assert.strictEqual(solution, 3);
    });

    it([
      `should return 1 for the 7th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 7);

      assert.strictEqual(solution, 1);
    });

    it([
      `should return 0 for the 8th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 8);

      assert.strictEqual(solution, 0);
    });

    it([
      `should return 4 for the 9th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 9);

      assert.strictEqual(solution, 4);
    });

    it([
      `should return 0 for the 10th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 10);

      assert.strictEqual(solution, 0);
    });
  });
});

describe('Day 15: Rambunctious Recitation (Part 2)', () => {
  describe('solverPart2()', () => {
    // Given example.
    it([
      `should do something.`
    ].join(''), () => {
      const solution = solverPart2(example);
    });
  });
});

// ===============
// == Functions ==
// ===============
