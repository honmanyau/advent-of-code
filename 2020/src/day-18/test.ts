import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  evaluatePart1,
  processFile,
  processEntry,
  evaluatePart2,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);
const stringifiedExample = JSON.stringify(example);

describe('Day 18: Operation Order (Part 1)', () => {
  describe(`evaluate()`, () => {
    it([
      `should return 71 for 1 + 2 * 3 + 4 * 5 + 6`
    ].join(''), () => {
      const tokens = processEntry(`1 + 2 * 3 + 4 * 5 + 6`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 71);
    });

    it([
      `should return 51 for 1 + (2 * 3) + (4 * (5 + 6))`
    ].join(''), () => {
      const tokens = processEntry(`1 + (2 * 3) + (4 * (5 + 6))`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 51);
    });

    it([
      `should return 26 for 2 * 3 + (4 * 5)`
    ].join(''), () => {
      const tokens = processEntry(`2 * 3 + (4 * 5)`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 26);
    });

    it([
      `should return 437 for 5 + (8 * 3 + 9 + 3 * 4 * 3)`
    ].join(''), () => {
      const tokens = processEntry(`5 + (8 * 3 + 9 + 3 * 4 * 3)`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 437);
    });

    it([
      `should return 12240 for 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`
    ].join(''), () => {
      const tokens = processEntry(
        `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`
      );
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 12240);
    });

    it([
      `should return 13632 for 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`
    ].join(''), () => {
      const tokens = processEntry(
        `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`
      );
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 13632);
    });

    it([
      `should return 0 for 0`
    ].join(''), () => {
      const tokens = processEntry(`0`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 0);
    });

    it([
      `should return 2 for 2`
    ].join(''), () => {
      const tokens = processEntry(`2`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 2);
    });

    it([
      `should return 0 for (0)`
    ].join(''), () => {
      const tokens = processEntry(`(0)`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 0);
    });

    it([
      `should return 2 for (2)`
    ].join(''), () => {
      const tokens = processEntry(`(2)`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 2);
    });

    it([
      `should return 3 for 1 + (2)`
    ].join(''), () => {
      const tokens = processEntry(`(1) + (2)`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 3);
    });

    it([
      `should return 3 for 1 + (2)`
    ].join(''), () => {
      const tokens = processEntry(`(1) + (2)`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 3);
    });

    it([
      `should return 3 for (1) + (2)`
    ].join(''), () => {
      const tokens = processEntry(`(1) + (2)`);
      const solution = evaluatePart1(tokens);

      assert.strictEqual(solution, 3);
    });
  });

  describe(`solverPart1()`, () => {
    it([
      `should return 71 + 51 + 26, 437 + 12240 + 13632 = 26457 for the`,
      ` example.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(stringifiedExample);
      const solution = solverPart1(exampleCopy);

      assert.strictEqual(solution, 26457);
    });

    it([
      `should return 51 + 26 + 437 + 12240 + 13632 = 26386 for the`,
      ` example if the first entry is removed.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(stringifiedExample);
      const solution = solverPart1(exampleCopy.slice(1));

      assert.strictEqual(solution, 26386);
    });

    it([
      `should return 26 + 437 + 12240 + 13632 = 26335 for the`,
      ` example if the first 2 entries are removed.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(stringifiedExample);
      const solution = solverPart1(exampleCopy.slice(2));

      assert.strictEqual(solution, 26335);
    });

    it([
      `should return 437 + 12240 + 13632 = 26309 for the`,
      ` example if the first 3 entries are removed.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(stringifiedExample);
      const solution = solverPart1(exampleCopy.slice(3));

      assert.strictEqual(solution, 26309);
    });

    it([
      `should return 12240 + 13632 = 25872 for the`,
      ` example if the first 4 entries are removed.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(stringifiedExample);
      const solution = solverPart1(exampleCopy.slice(4));

      assert.strictEqual(solution, 25872);
    });

    it([
      `should return 13632 = 25872 for the`,
      ` example if the first 5 entries are removed.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(stringifiedExample);
      const solution = solverPart1(exampleCopy.slice(5));

      assert.strictEqual(solution, 13632);
    });
  });
});

describe('Day 18: Operation Order (Part 2)', () => {
  describe('solverPart2()', () => {
    // Given example.
    it([
      `should return 231 for 1 + 2 * 3 + 4 * 5 + 6`
    ].join(''), () => {
      const tokens = processEntry(`1 + 2 * 3 + 4 * 5 + 6`);
      const solution = evaluatePart2(tokens);

      assert.strictEqual(solution, 231);
    });

    it([
      `should return 51 for 1 + (2 * 3) + (4 * (5 + 6))`
    ].join(''), () => {
      const tokens = processEntry(`1 + (2 * 3) + (4 * (5 + 6))`);
      const solution = evaluatePart2(tokens);

      assert.strictEqual(solution, 51);
    });

    it([
      `should return 46 for 2 * 3 + (4 * 5)`
    ].join(''), () => {
      const tokens = processEntry(`2 * 3 + (4 * 5)`);
      const solution = evaluatePart2(tokens);

      assert.strictEqual(solution, 46);
    });

    it([
      `should return 1445 for 5 + (8 * 3 + 9 + 3 * 4 * 3)`
    ].join(''), () => {
      const tokens = processEntry(`5 + (8 * 3 + 9 + 3 * 4 * 3)`);
      const solution = evaluatePart2(tokens);

      assert.strictEqual(solution, 1445);
    });

    it([
      `should return 669060 for 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`
    ].join(''), () => {
      const tokens = processEntry(`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`);
      const solution = evaluatePart2(tokens);

      assert.strictEqual(solution, 669060);
    });

    it([
      `should return 23340 for ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 `,
      ` * 2`
    ].join(''), () => {
      const tokens = processEntry(
        `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`
      );
      const solution = evaluatePart2(tokens);

      assert.strictEqual(solution, 23340);
    });
  });
});

// ===============
// == Functions ==
// ===============
