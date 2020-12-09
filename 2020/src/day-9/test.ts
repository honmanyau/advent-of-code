import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  findContiguousSet,
  findWeakness,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 9: Encoding Error (Part 1)', () => {
  describe([
    `findWeakness()`
  ].join(''), () => {
    it([
      `should return ${yellow(127)} for the example data with a preamble size`,
      ` of ${yellow(5)}.`
    ].join(''), () => {
      const weakness = findWeakness(example, 5);

      assert.strictEqual(weakness, 127);
    });

    it([
      `should return ${yellow(1024)} for the example data with a preamble`,
      ` size of ${yellow(5)} if the sixth entry is changed to 1024.`
    ].join(''), () => {
      const modifiedData = [ ...example ];

      modifiedData[5] = 1024;

      const weakness = findWeakness(modifiedData, 5);

      assert.strictEqual(weakness, 1024);
    });

    it([
      `should return ${yellow(2048)} for the example data with a preamble`,
      ` size of ${yellow(5)} if the 15th entry is changed to 332 (valid) and.`,
      ` the 16th entry is changed to 2048.`,
    ].join(''), () => {
      const modifiedData = [ ...example ];

      modifiedData[14] = 332;
      modifiedData[15] = 2048;

      const weakness = findWeakness(modifiedData, 5);

      assert.strictEqual(weakness, 2048);
    });

    it([
      `should throw an error if the 15th entry and all entries that follow are`,
      ` removed.`
    ].join(''), () => {
      const modifiedData = example.slice(0, 14);

      assert.throws(() => findWeakness(modifiedData, 5), Error);
    });
  });

  describe(`sovlerPart1()`, () => {
    it([
      `should return ${yellow(1024)} for the test input [ 1, 2, ..., 24,`,
      ` 25, 1024 ]`
    ].join(''), () => {
      const testInput = Array.from({ length: 25 })
        .map((_v, i) => i + 1)
        .concat([ 1024 ]);
      const weakness = solverPart1(testInput);

      assert.strictEqual(weakness, 1024);
    });

    it([
      `should return ${yellow(1024)} for the test input [ 1, 2, ..., 24,`,
      ` 25, 26, 1024 ]`
    ].join(''), () => {
      const testInput = Array.from({ length: 26 })
        .map((_v, i) => i + 1)
        .concat([ 1024 ]);
      const weakness = solverPart1(testInput);

      assert.strictEqual(weakness, 1024);
    });

    it([
      `should return ${yellow(1024)} for the test input [ 1, 2, ..., 24,`,
      ` 25, 26, 1024, 2048 ]`
    ].join(''), () => {
      const testInput = Array.from({ length: 26 })
        .map((_v, i) => i + 1)
        .concat([ 1024, 2048 ]);
      const weakness = solverPart1(testInput);

      assert.strictEqual(weakness, 1024);
    });

    it([
      `should return ${yellow(1024)} for the test input [ 1, 2, ..., 24,`,
      ` 25, 26, 1024, 2048, 27, 28, 29, 30 ]`
    ].join(''), () => {
      const testInput = Array.from({ length: 26 })
        .map((_v, i) => i + 1)
        .concat([ 1024, 2048, 27, 28, 29, 30 ]);
      const weakness = solverPart1(testInput);

      assert.strictEqual(weakness, 1024);
    });

    it([
      `should return ${yellow(1024)} for the test input [ 1, 2, ..., 24,`,
      ` 25, 26, 2048, 1024, 27, 28, 29, 30 ]`
    ].join(''), () => {
      const testInput = Array.from({ length: 26 })
        .map((_v, i) => i + 1)
        .concat([ 2048, 1024, 27, 28, 29, 30 ]);
      const weakness = solverPart1(testInput);

      assert.strictEqual(weakness, 2048);
    });

    it([
      `should throw an error for the test input [ 1, 2, ..., 24,`,
      ` 25, 26, 27, 28, 29, 30 ]`
    ].join(''), () => {
      const testInput = Array.from({ length: 30 })
        .map((_v, i) => i + 1);

      assert.throws(() => solverPart1(testInput), Error);
    });
  });
});

describe('Day 9: Encoding Error (Part 2)', () => {
  describe('findContiguousSet()', () => {
    // Given example.
    it([
      `should return ${yellow([ 15, 25, 47, 40 ])} for the example input.`
    ].join(''), () => {
      const solution = findContiguousSet(example, 5);

      assert.deepStrictEqual(solution, [ 15, 25, 47, 40 ]);
    });

    it([
      `should return ${yellow([ 35, 20, 15, 25, 47 ])} for the example input`,
      ' if the 15th entry is changed from 127 (invalid) to 332 (valid), and',
      ' the 14th entry is changed from 182 (valid) to 142 (invalid)'
    ].join(''), () => {
      const modifiedData = [ ...example ];

      modifiedData[14] = 332;
      modifiedData[15] = 142;

      const solution = findContiguousSet(modifiedData, 5);

      assert.deepStrictEqual(solution, [ 35, 20, 15, 25, 47 ]);
    });

    it([
      `should return ${yellow([ 20, 15, 25, 47, 40, 62 ])} for the example input`,
      ' if the 15th entry is changed from 127 (invalid) to 332 (valid), and',
      ' the 14th entry is changed from 182 (valid) to 209 (invalid)'
    ].join(''), () => {
      const modifiedData = [ ...example ];

      modifiedData[14] = 332;
      modifiedData[15] = 209;

      const solution = findContiguousSet(modifiedData, 5);

      assert.deepStrictEqual(solution, [ 20, 15, 25, 47, 40, 62 ]);
    });
  });

  describe('solverPart2()', () => {
    // Given example.
    it([
      `return ${yellow(62)} for the example input with a preamble size of 5.`
    ].join(''), () => {
      const solution = solverPart2(example, 5);

      assert.strictEqual(solution, 62);
    });

    it([
      `should return ${yellow(62)} for the example input`,
      ' if the 15th entry is changed from 127 (invalid) to 332 (valid), and',
      ' the 14th entry is changed from 182 (valid) to 142 (invalid)'
    ].join(''), () => {
      const modifiedData = [ ...example ];

      modifiedData[14] = 332;
      modifiedData[15] = 142;

      const solution = solverPart2(modifiedData, 5);

      assert.strictEqual(solution, 62);
    });

    it([
      `should return ${yellow(77)} for the example input`,
      ' if the 15th entry is changed from 127 (invalid) to 332 (valid), and',
      ' the 14th entry is changed from 182 (valid) to 209 (invalid)'
    ].join(''), () => {
      const modifiedData = [ ...example ];

      modifiedData[14] = 332;
      modifiedData[15] = 209;

      const solution = solverPart2(modifiedData, 5);

      assert.strictEqual(solution, 77);
    });

    it([
      `should return ${yellow(49)} for the test input [ 1, 2, ..., 24,`,
      ` 25, 172 ] with a preamble size of 25.`
    ].join(''), () => {
      const testInput = Array.from({ length: 25 })
        .map((_v, i) => i + 1)
        .concat([ 172 ]);
      const solution = solverPart2(testInput);

      assert.strictEqual(solution, 43);
    });

    it([
      `should return ${yellow(36)} for the test input [ 1, 2, ..., 24,`,
      ` 25, 280 ] with a preamble size of 25.`
    ].join(''), () => {
      const testInput = Array.from({ length: 25 })
        .map((_v, i) => i + 1)
        .concat([ 280 ]);
      const solution = solverPart2(testInput);

      assert.strictEqual(solution, 35);
    });
  });
});

// ===============
// == Functions ==
// ===============
