import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  getBorders,
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 20: Jurassic Jigsaw (Part 1)', () => {
  describe(`getBorders()`, () => {
    it([
      `should return the following borders for Tile 2311 given in the example`,
      ` with correctly associated id's and number of #'s `,
      `           ..##.#..#. (top, 4 #'s)\n`,
      `           .#..#.##.. (top reverse 4 #'s)\n`,
      `           .#####..#. (left 6 #'s)\n`,
      `           .#..#####. (left reverse 6 #'s)\n`,
      `           ...#.##..# (right 4 #'s)\n`,
      `           #..##.#... (right reverse 4 #'s)\n`,
      `           ..###..### (bottom 6 #'s)\n`,
      `           ###..###.. (bottom reverse 6 #'s)`
    ].join(''), () => {
      const solution = getBorders([ example[2311] ]);
      const expectedBorders = [
        `..##.#..#.`,
        `.#..#.##..`,
        `.#####..#.`,
        `.#..#####.`,
        `...#.##..#`,
        `#..##.#...`,
        `..###..###`,
        `###..###..`
      ];

      for (const item of solution) {
        const index = expectedBorders.indexOf(item.border);
        const numFilled = item.border.replace(/\./g, '').length;

        assert.strictEqual(!!~index, true);
        assert.strictEqual(item.filled, numFilled);
        assert.strictEqual(item.id, 2311);
      }
    });

    it([
      `should return the following borders for Tile 1427 given in the example`,
      ` with correctly associated id's and number of #'s `,
      `           ###.##.#.. (top, 6 #'s)\n`,
      `           ..#.##.### (top reverse 6 #'s)\n`,
      `           #..#...... (left 2 #'s)\n`,
      `           ......#..# (left reverse 2 #'s)\n`,
      `           ..###.#.#. (right 5 #'s)\n`,
      `           .#.#.###.. (right reverse 5 #'s)\n`,
      `           ..##.#..#. (bottom 4 #'s)\n`,
      `           .#..#.##.. (bottom reverse 4 #'s)`
    ].join(''), () => {
      const solution = getBorders([ example[1427] ]);
      const expectedBorders = [
        `###.##.#..`,
        `..#.##.###`,
        `#..#......`,
        `......#..#`,
        `..###.#.#.`,
        `.#.#.###..`,
        `..##.#..#.`,
        `.#..#.##..`
      ];

      for (const item of solution) {
        const index = expectedBorders.indexOf(item.border);
        const numFilled = item.border.replace(/\./g, '').length;

        assert.strictEqual(!!~index, true);
        assert.strictEqual(item.filled, numFilled);
        assert.strictEqual(item.id, 1427);
      }
    });

    it([
      `should return the following borders for Tile 1427 given in the example`,
      ` with correctly associated id's and number of #'s `,
      `           ..#.#....# (top, 3 #'s)\n`,
      `           #....#.#.. (top reverse 3 #'s)\n`,
      `           .###..#... (left 4 #'s)\n`,
      `           ...#..###. (left reverse 4 #'s)\n`,
      `           #...##.#.# (right 5 #'s)\n`,
      `           #.#.##...# (right reverse 5 #'s)\n`,
      `           ...#.#.#.# (bottom 4 #'s)\n`,
      `           #.#.#.#... (bottom reverse 4 #'s)`
    ].join(''), () => {
      const solution = getBorders([ example[2971] ]);
      const expectedBorders = [
        `..#.#....#`,
        `#....#.#..`,
        `.###..#...`,
        `...#..###.`,
        `#...##.#.#`,
        `#.#.##...#`,
        `...#.#.#.#`,
        `#.#.#.#...`
      ];

      for (const item of solution) {
        const index = expectedBorders.indexOf(item.border);
        const numFilled = item.border.replace(/\./g, '').length;

        assert.strictEqual(!!~index, true);
        assert.strictEqual(item.filled, numFilled);
        assert.strictEqual(item.id, 2971);
      }
    });
  });

  describe(`sovlerPart1()`, () => {
    it([
      `should do something.`
    ].join(''), () => {
      const solution = solverPart1(example);
    });
  });
});

describe('Day 20: Jurassic Jigsaw (Part 2)', () => {
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
