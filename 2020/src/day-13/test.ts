import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 13: Shuttle Search (Part 1)', () => {
  describe(`sovlerPart1()`, () => {
    it([
      `should return 295 for the example.`
    ].join(''), () => {
      const solution = solverPart1(example);

      assert.strictEqual(solution, 295);
    });

    it([
      `should return 0 for the test input [ '8', '7,x,4' ].`
    ].join(''), () => {
      const solution = solverPart1([ '8', '7,x,4' ]);

      assert.strictEqual(solution, 0);
    });

    it([
      `should return 12 for the test input [ '9', '7,x,4' ].`
    ].join(''), () => {
      const solution = solverPart1([ '9', '7,x,4' ]);

      assert.strictEqual(solution, 12);
    });

    it([
      `should return 22 for the test input [ '9', '7,11,x,4' ].`
    ].join(''), () => {
      const solution = solverPart1([ '9', '7,11,x,4' ]);

      assert.strictEqual(solution, 22);
    });
  });
});

describe('Day 13: Shuttle Search (Part 2)', () => {
  describe('solverPart2()', () => {
    // Given example.
    it([
      `should return 1068781 for the example.`
    ].join(''), () => {
      const solution = solverPart2(example);

      assert.strictEqual(solution, 1068781);
    });

    // Given example.
    it([
      `should return 3417 for the input '17,x,13,19'.`
    ].join(''), () => {
      const solution = solverPart2('17,x,13,19');

      assert.strictEqual(solution, 3417);
    });

    // Given example.
    it([
      `should return 754018 for the input '67,7,59,61'.`
    ].join(''), () => {
      const solution = solverPart2('67,7,59,61');

      assert.strictEqual(solution, 754018);
    });

    // Given example.
    it([
      `should return 779210 for the input '67,x,7,59,61'.`
    ].join(''), () => {
      const solution = solverPart2('67,x,7,59,61');

      assert.strictEqual(solution, 779210);
    });

    // Given example.
    it([
      `should return 1261476 for the input '67,7,x,59,61'.`
    ].join(''), () => {
      const solution = solverPart2('67,7,x,59,61');

      assert.strictEqual(solution, 1261476);
    });

    // Given example.
    it([
      `should return 1202161486 for the input '1789,37,47,1889'.`
    ].join(''), () => {
      const solution = solverPart2('1789,37,47,1889');

      assert.strictEqual(solution, 1202161486);
    });
  });
});

// ===============
// == Functions ==
// ===============
