import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  getRowNumber,
  getColNumber,
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

    it([
      `should throw an error if the string does not have the correct format.`
    ].join(''), () => {
      assert.throws(() => getRowNumber('XFFFFFFLLL'), Error);
      assert.throws(() => getRowNumber('FFFFFFFXLL'), Error);
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

    it([
      `should throw an error if the string does not have the correct format.`
    ].join(''), () => {
      assert.throws(() => getColNumber('XFFFFFFLLL'), Error);
      assert.throws(() => getColNumber('FFFFFFFXLL'), Error);
    });
  });
});

// ===============
// == Functions ==
// ===============