import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  getRowNumber,
  getColNumber,
  getSeatId,
  solverPart1
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 5: Binary Boarding (Part 1)', () => {
  describe('getRowNumber()', () => {
    it([
      `should return ${yellow(0)} for the testInput:`,
      ' FFFFFFFLLL.'
    ].join(''), () => {
      assert.strictEqual(getRowNumber('FFFFFFFLLL'), 0);
    });

    it([
      `should return ${yellow(44)} for the first example input:`,
      ' FBFBBFFRLR.'
    ].join(''), () => {
      assert.strictEqual(getRowNumber(example[0]), 44);
    });

    it([
      `should return ${yellow(70)} for the second example input:`,
      ' BFFFBBFRRR.'
    ].join(''), () => {
      assert.strictEqual(getRowNumber(example[1]), 70);
    });

    it([
      `should return ${yellow(14)} for the second example input:`,
      ' FFFBBBFRRR.'
    ].join(''), () => {
      assert.strictEqual(getRowNumber(example[2]), 14);
    });

    it([
      `should return ${yellow(102)} for the second example input:`,
      ' BBFFBBFRLL.'
    ].join(''), () => {
      assert.strictEqual(getRowNumber(example[3]), 102);
    });

    it([
      `should return ${yellow(127)} for the testInput:`,
      ' BBBBBBBRRR.'
    ].join(''), () => {
      assert.strictEqual(getRowNumber('BBBBBBBRRR'), 127);
    });
  });

  describe('getColNumber()', () => {
    it([
      `should return ${yellow(0)} for the testInput:`,
      ' FFFFFFFLLL.'
    ].join(''), () => {
      assert.strictEqual(getColNumber('FFFFFFFLLL'), 0);
    });

    it([
      `should return ${yellow(5)} for the first example input:`,
      ' FBFBBFFRLR.'
    ].join(''), () => {
      assert.strictEqual(getColNumber(example[0]), 5);
    });

    it([
      `should return ${yellow(7)} for the second example input:`,
      ' BFFFBBFRRR.'
    ].join(''), () => {
      assert.strictEqual(getColNumber(example[1]), 7);
    });

    it([
      `should return ${yellow(7)} for the second example input:`,
      ' FFFBBBFRRR.'
    ].join(''), () => {
      assert.strictEqual(getColNumber(example[2]), 7);
    });

    it([
      `should return ${yellow(4)} for the second example input:`,
      ' BBFFBBFRLL.'
    ].join(''), () => {
      assert.strictEqual(getColNumber(example[3]), 4);
    });

    it([
      `should return ${yellow(7)} for the testInput:`,
      ' BBBBBBBRRR.'
    ].join(''), () => {
      assert.strictEqual(getColNumber('BBBBBBBRRR'), 7);
    });
  });

  describe([
    'getSeatId()'
  ].join(''), () => {
    it([
      `should return ${yellow(0)} for the testInput:`,
      ' FFFFFFFLLL.'
    ].join(''), () => {
      assert.strictEqual(getSeatId('FFFFFFFLLL'), 0);
    });

    it([
      `should return ${yellow(357)} for the first example input:`,
      ' FBFBBFFRLR.'
    ].join(''), () => {
      assert.strictEqual(getSeatId(example[0]), 357);
    });

    it([
      `should return ${yellow(567)} for the second example input:`,
      ' BFFFBBFRRR.'
    ].join(''), () => {
      assert.strictEqual(getSeatId(example[1]), 567);
    });

    it([
      `should return ${yellow(119)} for the second example input:`,
      ' FFFBBBFRRR.'
    ].join(''), () => {
      assert.strictEqual(getSeatId(example[2]), 119);
    });

    it([
      `should return ${yellow(820)} for the second example input:`,
      ' BBFFBBFRLL.'
    ].join(''), () => {
      assert.strictEqual(getSeatId(example[3]), 820);
    });

    it([
      `should return ${yellow(1023)} for the testInput:`,
      ' BBBBBBBRRR.'
    ].join(''), () => {
      assert.strictEqual(getSeatId('BBBBBBBRRR'), 1023);
    });

    it([
      `should throw an error if the string does not have the correct format.`
    ].join(''), () => {
      assert.throws(() => getSeatId('XFFFFFFLLL'), Error);
      assert.throws(() => getSeatId('FFFFFFFXLL'), Error);
    });
  });

  describe([
    'solverPart1()'
  ].join(''), () => {
    it([
      `should return ${yellow(820)} for the example input`
    ].join(''), () => {
      const solution = solverPart1(example);

      assert.strictEqual(solution, 820);
    });

    it([
      `should return ${yellow(567)} for the example input if the last entry`,
      ' is removed.'
    ].join(''), () => {
      const modifiedExample = [ ...example ];

      modifiedExample.splice(-1);

      const solution = solverPart1(modifiedExample);

      assert.strictEqual(solution, 567);
    });

    it([
      `should return ${yellow(1023)} for the example input if 'BBBBBBBRRR'`,
      ' is added.'
    ].join(''), () => {
      const modifiedExample = [ ...example, 'BBBBBBBRRR' ];
      const solution = solverPart1(modifiedExample);

      assert.strictEqual(solution, 1023);
    });
  });
});

// ===============
// == Functions ==
// ===============