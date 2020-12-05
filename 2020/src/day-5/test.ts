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
      //
    });

    it([
      `should return ${yellow(44)} for the first example input:`,
      ' FBFBBFFRLR.'
    ].join(''), () => {
      //
    });

    it([
      `should return ${yellow(70)} for the second example input:`,
      ' BFFFBBFRRR.'
    ].join(''), () => {
      //
    });

    it([
      `should return ${yellow(14)} for the second example input:`,
      ' FFFBBBFRRR.'
    ].join(''), () => {
      //
    });

    it([
      `should return ${yellow(102)} for the second example input:`,
      ' BBFFBBFRLL.'
    ].join(''), () => {
      //
    });

    it([
      `should return ${yellow(127)} for the testInput:`,
      ' BBBBBBBRRR.'
    ].join(''), () => {
      //
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
      //
    });

    it([
      `should return ${yellow(5)} for the first example input:`,
      ' FBFBBFFRLR.'
    ].join(''), () => {
      //
    });

    it([
      `should return ${yellow(7)} for the second example input:`,
      ' BFFFBBFRRR.'
    ].join(''), () => {
      //
    });

    it([
      `should return ${yellow(7)} for the second example input:`,
      ' FFFBBBFRRR.'
    ].join(''), () => {
      //
    });

    it([
      `should return ${yellow(4)} for the second example input:`,
      ' BBFFBBFRLL.'
    ].join(''), () => {
      //
    });

    it([
      `should return ${yellow(7)} for the testInput:`,
      ' BBBBBBBRRR.'
    ].join(''), () => {
      //
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