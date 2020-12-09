import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
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
  });
});

describe('Day 9: Encoding Error (Part 2)', () => {
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
