import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  processEntry,
  solverPart1,
  solverPart2
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
      `should return ${yellow(4)} for the given example if the first two`,
      ' instructions is removed.'
    ].join(''), () => {
      const modifiedExample = example.slice(2);
      const solution = solverPart1(modifiedExample);

      assert.strictEqual(solution, 4);
    });

    it([
      `should return ${yellow(4)} for the given example if the first two`,
      ' instructions is removed.'
    ].join(''), () => {
      const modifiedExample = example.slice(2);
      const solution = solverPart1(modifiedExample);

      assert.strictEqual(solution, 4);
    });

    it([
      `should return ${yellow(1)} for the input:\n`,
      '         [\n',
      '           nop +0\n',
      '           acc +1\n',
      '           jmp -1\n',
      '         ]',
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
