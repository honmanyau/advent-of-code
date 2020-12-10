import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  calcDifferences,
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathnamePart1a = path.resolve(__dirname, './example-part-1a.txt');
const examplePathnamePart1b = path.resolve(__dirname, './example-part-1b.txt');
const exampleFilePart1a = fs.readFileSync(examplePathnamePart1a, 'utf-8');
const exampleFilePart1b = fs.readFileSync(examplePathnamePart1b, 'utf-8');
const examplePart1a = processFile(exampleFilePart1a);
const examplePart1b = processFile(exampleFilePart1b);


describe('Day 10: Adapter Array (Part 1)', () => {
  describe(`calcDifferences()`, () => {
    it([
      `should return an array containing 7 differences of 1, and 5`,
      ` differences of 3, for the first example.`
    ].join(''), () => {
      const differences = calcDifferences(examplePart1a);
      const ones = differences.filter((v) => v === 1);
      const threes = differences.filter((v) => v === 3);

      assert.strictEqual(ones.length, 7);
      assert.strictEqual(threes.length, 5);
    });

    it([
      `should return an array containing 22 differences of 1, and 10`,
      ` differences of 3, for the second example.`
    ].join(''), () => {
      const differences = calcDifferences(examplePart1b);
      const ones = differences.filter((v) => v === 1);
      const threes = differences.filter((v) => v === 3);

      assert.strictEqual(ones.length, 22);
      assert.strictEqual(threes.length, 10);
    });

    it([
      `should return an array containing 1 difference of 1, and 1`,
      ` difference of 3, for the example [ 1 ].`
    ].join(''), () => {
      const differences = calcDifferences([ 1 ]);
      const ones = differences.filter((v) => v === 1);
      const threes = differences.filter((v) => v === 3);

      assert.strictEqual(ones.length, 1);
      assert.strictEqual(threes.length, 1);
    });

    it([
      `should return an array containing 0 difference of 1, and 1`,
      ` difference of 3, for the example [ 2 ].`
    ].join(''), () => {
      const differences = calcDifferences([ 2 ]);
      const ones = differences.filter((v) => v === 1);
      const threes = differences.filter((v) => v === 3);

      assert.strictEqual(ones.length, 0);
      assert.strictEqual(threes.length, 1);
    });

    it([
      `should return an array containing 0 difference of 1, and 2`,
      ` difference of 3, for the example [ 3 ].`
    ].join(''), () => {
      const differences = calcDifferences([ 3 ]);
      const ones = differences.filter((v) => v === 1);
      const threes = differences.filter((v) => v === 3);

      assert.strictEqual(ones.length, 0);
      assert.strictEqual(threes.length, 2);
    });

    it([
      `should return an array containing 0 difference of 1, and 2`,
      ` difference of 3, for the example [ 1, 2, 5 ].`
    ].join(''), () => {
      const differences = calcDifferences([ 1, 2, 5 ]);
      const ones = differences.filter((v) => v === 1);
      const threes = differences.filter((v) => v === 3);

      assert.strictEqual(ones.length, 2);
      assert.strictEqual(threes.length, 2);
    });

    it([
      `should throw an error if the input contains a solution > 3.`
    ].join(''), () => {
      assert.throws(() => calcDifferences([ 4 ]), Error);
      assert.throws(() => calcDifferences([ 1, 3, 7 ]), Error);
      assert.throws(() => calcDifferences([ 4, 5, 6 ]), Error);
      assert.throws(() => calcDifferences([ 2, 6, 7 ]), Error);
    });
  });

  describe(`sovlerPart1()`, () => {
    it([
      `should do something.`
    ].join(''), () => {
      // const solution = solverPart1(example);
    });
  });
});

describe('Day 10: Adapter Array (Part 2)', () => {
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
