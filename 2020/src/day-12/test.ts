import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  solverPart1,
  solverPart2,
  Instruction
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 12: Rain Risk (Part 1)', () => {
  describe(`sovlerPart1()`, () => {
    it([
      `should return 25 for the example.`
    ].join(''), () => {
      const solution = solverPart1(example);

      assert.strictEqual(solution, 25);
    });

    it([
      `should return 0 for the following test input:`,
      '          [ F 0 ]'
    ].join(''), () => {
      const testInput: Instruction[] = [
        [ 'F', 0 ]
      ];
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 0);
    });

    it([
      `should return 10 for the following test input:`,
      '          [ F 21 ]'
    ].join(''), () => {
      const testInput: Instruction[] = [
        [ 'F', 21 ]
      ];
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 10);
    });
    
    it([
      `should return 42 for the following test input:`,
      '          [ E 21 ]',
      '          [ S 21 ]'
    ].join(''), () => {
      const testInput: Instruction[] = [
        [ 'E', 21 ],
        [ 'S', 21 ]
      ];
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 42);
    });

    it([
      `should return 42 for the following test input:`,
      '          [ E 21 ]',
      '          [ N 21 ]'
    ].join(''), () => {
      const testInput: Instruction[] = [
        [ 'E', 21 ],
        [ 'N', 21 ]
      ];
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 42);
    });

    it([
      `should return 42 for the following test input:`,
      '          [ W 21 ]',
      '          [ S 21 ]'
    ].join(''), () => {
      const testInput: Instruction[] = [
        [ 'W', 21 ],
        [ 'S', 21 ]
      ];
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 42);
    });

    it([
      `should return 42 for the following test input:`,
      '          [ W 21 ]',
      '          [ N 21 ]'
    ].join(''), () => {
      const testInput: Instruction[] = [
        [ 'W', 21 ],
        [ 'N', 21 ]
      ];
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 42);
    });

    it([
      `should return 42 for the following test input:`,
      '          [ E 21 ]',
      '          [ L 90 ]',
      '          [ F 21 ]'
    ].join(''), () => {
      const testInput: Instruction[] = [
        [ 'E', 21 ],
        [ 'L', 90 ],
        [ 'F', 21 ],
      ];
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 42);
    });

    it([
      `should return 0 for the following test input:`,
      '          [ E 21 ]',
      '          [ L 180 ]',
      '          [ F 21 ]'
    ].join(''), () => {
      const testInput: Instruction[] = [
        [ 'E', 21 ],
        [ 'L', 180 ],
        [ 'F', 21 ],
      ];
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 0);
    });

    it([
      `should return 42 for the following test input:`,
      '          [ E 21 ]',
      '          [ L 360 ]',
      '          [ F 21 ]'
    ].join(''), () => {
      const testInput: Instruction[] = [
        [ 'E', 21 ],
        [ 'L', 360 ],
        [ 'F', 21 ],
      ];
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 42);
    });
  });
});

describe('Day 12: Rain Risk (Part 2)', () => {
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
