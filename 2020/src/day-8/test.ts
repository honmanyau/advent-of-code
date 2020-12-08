import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  processEntry,
  solverPart1,
  solverPart2,
  walk
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 8: Handheld Halting (Part 1)', () => {
  describe(`sovlerPart1()`, () => {
    it([
      `should return ${yellow(5)} for the given example.`
    ].join(''), () => {
      const solution = solverPart1(example);

      assert.strictEqual(solution, 5);
    });

    it([
      `should return ${yellow(5)} for the given example if the first`,
      ' instruction is removed.'
    ].join(''), () => {
      const modifiedExample = example.slice(1);
      const solution = solverPart1(modifiedExample);

      assert.strictEqual(solution, 5);
    });

    it([
      `should return ${yellow(1)} for the input:\n`,
      '        [\n',
      '          nop +0\n',
      '          acc +1\n',
      '          jmp -1\n',
      '        ]',
    ].join(''), () => {
      const testInput = [ 'nop +0', 'acc +1', 'jmp -1' ].map(processEntry);
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 1);
    });

    it([
      `should thorw an error for inputs that never loops infinitely.`
    ].join(''), () => {
      const testInput1 = [ 'nop +0' ].map(processEntry);
      const testInput2 = [ 'nop +0', 'acc +1' ].map(processEntry);
      const testInput3 = [
        'nop +0', 'jmp +2', 'jmp +3', 'acc +1', 'jmp -2', 'acc +1'
      ].map(processEntry);
      assert.throws(() => solverPart1(testInput1), Error);
      assert.throws(() => solverPart1(testInput2), Error);
      assert.throws(() => solverPart1(testInput3), Error);
    });
  });
});

describe('Day 8: Handheld Halting (Part 2)', () => {
  describe(`walk()`, () => {
    it([
      `should return the following object for the given example:\n`,
      `        {\n`,
      `          visitedPath: [ 0, 1, 2, 6, 7, 3, 4, 1 ],\n`,
      `          visitedNop: [ 0 ],\n`,
      `          visitedJmp: [ 2, 7, 4 ],\n`,
      `          looped: true,\n`,
      `          outOfRange: false,\n`,
      `          terminated: false,\n`,
      `          accumulator: 5\n`,
      `        }`,
    ].join(''), () => {
      const {
        visitedPath,
        visitedNop,
        visitedJmp,
        looped,
        outOfRange,
        terminated,
        accumulator
      } = walk(example);

      assert.deepStrictEqual(visitedPath, [ 0, 1, 2, 6, 7, 3, 4, 1 ]);
      assert.deepStrictEqual(visitedNop, [ 0 ]);
      assert.deepStrictEqual(visitedJmp, [ 2, 7, 4 ]);
      assert.strictEqual(accumulator, 5);
      assert.strictEqual(looped, true);
      assert.strictEqual(outOfRange, false);
      assert.strictEqual(terminated, false);
    });

    it([
      `should return the following object for the input [ 'nop +0' ]:\n`,
      `        {\n`,
      `          visitedPath: [ 0 ],\n`,
      `          visitedNop: [ 0 ],\n`,
      `          visitedJmp: [],\n`,
      `          looped: false,\n`,
      `          outOfRange: false,\n`,
      `          terminated: true,\n`,
      `          accumulator: 0\n`,
      `        }`,
    ].join(''), () => {
      const testInput = [ 'nop +0' ].map(processEntry);
      const {
        visitedPath,
        visitedNop,
        visitedJmp,
        looped,
        outOfRange,
        terminated,
        accumulator
      } = walk(testInput);

      console.log(walk(testInput));

      assert.deepStrictEqual(visitedPath, [ 0 ]);
      assert.deepStrictEqual(visitedNop, [ 0 ]);
      assert.deepStrictEqual(visitedJmp, []);
      assert.strictEqual(accumulator, 0);
      assert.strictEqual(looped, false);
      assert.strictEqual(outOfRange, false);
      assert.strictEqual(terminated, true);
    });

    it([
      `should return the following object for the input`,
      ` [ 'nop +0', 'acc +10' ]:\n`, 
      `        {\n`,
      `          visitedPath: [ 0 ],\n`,
      `          visitedNop: [ 0 ],\n`,
      `          visitedJmp: [],\n`,
      `          looped: false,\n`,
      `          outOfRange: false,\n`,
      `          terminated: true,\n`,
      `          accumulator: 0\n`,
      `        }`,
    ].join(''), () => {
      const testInput = [ 'acc +10', 'nop +0' ].map(processEntry);
      const {
        visitedPath,
        visitedNop,
        visitedJmp,
        looped,
        outOfRange,
        terminated,
        accumulator
      } = walk(testInput);

      console.log(walk(testInput));

      assert.deepStrictEqual(visitedPath, [ 0, 1 ]);
      assert.deepStrictEqual(visitedNop, [ 1 ]);
      assert.deepStrictEqual(visitedJmp, []);
      assert.strictEqual(accumulator, 10);
      assert.strictEqual(looped, false);
      assert.strictEqual(outOfRange, false);
      assert.strictEqual(terminated, true);
    });

    it([
      `should return the following object for the input`,
      ` [ 'nop +0', 'jmp +1', 'acc +10' ]:\n`, 
      `        {\n`,
      `          visitedPath: [ 0 ],\n`,
      `          visitedNop: [ 0 ],\n`,
      `          visitedJmp: [],\n`,
      `          looped: false,\n`,
      `          outOfRange: false,\n`,
      `          terminated: true,\n`,
      `          accumulator: 0\n`,
      `        }`,
    ].join(''), () => {
      const testInput = [ 'acc +10', 'jmp +1', 'nop +0' ].map(processEntry);
      const {
        visitedPath,
        visitedNop,
        visitedJmp,
        looped,
        outOfRange,
        terminated,
        accumulator
      } = walk(testInput);

      console.log(walk(testInput));

      assert.deepStrictEqual(visitedPath, [ 0, 1, 2 ]);
      assert.deepStrictEqual(visitedNop, [ 2 ]);
      assert.deepStrictEqual(visitedJmp, [ 1 ]);
      assert.strictEqual(accumulator, 10);
      assert.strictEqual(looped, false);
      assert.strictEqual(outOfRange, false);
      assert.strictEqual(terminated, true);
    });

    it([
      `should return the following object for the input`,
      ` [ 'jmp +0', ]:\n`, 
      `        {\n`,
      `          visitedPath: [ 0 ],\n`,
      `          visitedNop: [ 0 ],\n`,
      `          visitedJmp: [],\n`,
      `          looped: false,\n`,
      `          outOfRange: false,\n`,
      `          terminated: true,\n`,
      `          accumulator: 0\n`,
      `        }`,
    ].join(''), () => {
      const testInput = [ 'jmp +0' ].map(processEntry);
      const {
        visitedPath,
        visitedNop,
        visitedJmp,
        looped,
        outOfRange,
        terminated,
        accumulator
      } = walk(testInput);

      console.log(walk(testInput));

      assert.deepStrictEqual(visitedPath, [ 0, 0 ]);
      assert.deepStrictEqual(visitedNop, []);
      assert.deepStrictEqual(visitedJmp, [ 0 ]);
      assert.strictEqual(accumulator, 0);
      assert.strictEqual(looped, true);
      assert.strictEqual(outOfRange, false);
      assert.strictEqual(terminated, false);
    });
  });

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
