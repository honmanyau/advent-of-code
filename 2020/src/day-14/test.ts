import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import {
  applyMask,
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 14: Docking Data (Part 1)', () => {
  describe(`applyMask()`, () => {
    it([
      `should leave a binary number unchanged with the bit mask`,
      ' XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    ].join(''), () => {
      const mask = 'X'.repeat(36);
      const binaryNumber = '1011';
      const masked = applyMask(mask, binaryNumber);
      const expected = binaryNumber.padStart(36, '0');

      assert.strictEqual(masked, expected);
    });

    it([
      `should leave a binary number unchanged with the bit mask`,
      ' XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXX'
    ].join(''), () => {
      const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXX';
      const binaryNumber = '1011';
      const masked = applyMask(mask, binaryNumber);
      const expected = binaryNumber.padStart(36, '0');

      assert.strictEqual(masked, expected);
    });

    it([
      `should change 1011 to 1111 with the bit mask`,
      ' XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX'
    ].join(''), () => {
      const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX';
      const binaryNumber = '1011';
      const masked = applyMask(mask, binaryNumber);
      const expected = '1111'.padStart(36, '0');

      assert.strictEqual(masked, expected);
    });

    it([
      `should change 1011 to 11011 with the bit mask`,
      ' XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX'
    ].join(''), () => {
      const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX';
      const binaryNumber = '1011';
      const masked = applyMask(mask, binaryNumber);
      const expected = '11011'.padStart(36, '0');

      assert.strictEqual(masked, expected);
    });

    it([
      `should change 1011 to 11 with the bit mask`,
      ' XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0XXX'
    ].join(''), () => {
      const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0XXX';
      const binaryNumber = '1011';
      const masked = applyMask(mask, binaryNumber);
      const expected = '11'.padStart(36, '0');

      assert.strictEqual(masked, expected);
    });

    it([
      `should any number to 2 ** 35`,
      ' 100000000000000000000000000000000000'
    ].join(''), () => {
      const mask = '100000000000000000000000000000000000';
      const binaryNumber = '1011';
      const masked = applyMask(mask, binaryNumber);
      const expected = mask

      assert.strictEqual(masked, expected);
    });
  });

  describe(`sovlerPart1()`, () => {
    it([
      `should do something.`
    ].join(''), () => {
      const solution = solverPart1(example);
    });
  });
});

describe('Day 14: Docking Data (Part 2)', () => {
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
