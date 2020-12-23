import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  evaluate,
  processFile,
  processEntry,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 18: Operation Order (Part 1)', () => {
  describe(`evaluate()`, () => {
    it([
      `should return 71 for 1 + 2 * 3 + 4 * 5 + 6`
    ].join(''), () => {
      const tokens = processEntry(`1 + 2 * 3 + 4 * 5 + 6`);
      const solution = evaluate(tokens);

      assert.strictEqual(solution, 71);
    });

    it([
      `should return 51 for 1 + (2 * 3) + (4 * (5 + 6))`
    ].join(''), () => {
      const tokens = processEntry(`1 + (2 * 3) + (4 * (5 + 6))`);
      const solution = evaluate(tokens);

      assert.strictEqual(solution, 51);
    });

    it([
      `should return 26 for 2 * 3 + (4 * 5)`
    ].join(''), () => {
      const tokens = processEntry(`2 * 3 + (4 * 5)`);
      const solution = evaluate(tokens);

      assert.strictEqual(solution, 26);
    });

    it([
      `should return 437 for 5 + (8 * 3 + 9 + 3 * 4 * 3)`
    ].join(''), () => {
      const tokens = processEntry(`5 + (8 * 3 + 9 + 3 * 4 * 3)`);
      const solution = evaluate(tokens);

      assert.strictEqual(solution, 437);
    });

    it([
      `should return 13632 for 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`
    ].join(''), () => {
      const tokens = processEntry(
        `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`
      );
      const solution = evaluate(tokens);

      assert.strictEqual(solution, 13632);
    });

    it([
      `should return 12240 for 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`
    ].join(''), () => {
      const tokens = processEntry(
        `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`
      );
      const solution = evaluate(tokens);

      assert.strictEqual(solution, 12240);
    });
  });

  describe(`solverPart1()`, () => {
    it([
      `should return 71 + 51 + 26, 437 + 13632 + 12240 = 26457 for the`,
      ` example.`
    ].join(''), () => {
      const solution = solverPart1(example);

      assert.strictEqual(solution, 26457);
    });

    it([
      `should return 51 + 26, 437 + 13632 + 12240 = 26386 for the`,
      ` example if the first entry is removed.`
    ].join(''), () => {
      const solution = solverPart1(example.slice(1));

      assert.strictEqual(solution, 26386);
    });

    it([
      `should return 26 + 437 + 13632 + 12240 = 26335 for the`,
      ` example if the first 2 entries are removed.`
    ].join(''), () => {
      const solution = solverPart1(example.slice(2));

      assert.strictEqual(solution, 26335);
    });

    it([
      `should return 437 + 13632 + 12240 = 26309 for the`,
      ` example if the first 3 entries are removed.`
    ].join(''), () => {
      const solution = solverPart1(example.slice(3));

      assert.strictEqual(solution, 26309);
    });

    it([
      `should return 13632 + 12240 = 25872 for the`,
      ` example if the first 4 entries are removed.`
    ].join(''), () => {
      const solution = solverPart1(example.slice(4));

      assert.strictEqual(solution, 25872);
    });

    it([
      `should return 12240 = 25872 for the`,
      ` example if the first 5 entries are removed.`
    ].join(''), () => {
      const solution = solverPart1(example.slice(5));

      assert.strictEqual(solution, 12240);
    });
  });
});

describe('Day 18: Operation Order (Part 2)', () => {
  describe('solverPart2()', () => {
    // Given example.
    it([
      `should do something.`
    ].join(''), () => {
      // const solution = solverPart2(example);
    });
  });
});

// ===============
// == Functions ==
// ===============
