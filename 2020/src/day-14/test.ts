import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import {
  applyMask,
  applyMaskToAddress,
  maskedAddressToDecimals,
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathnamePart1 = path.resolve(__dirname, './example-part-1.txt');
const examplePathnamePart2 = path.resolve(__dirname, './example-part-2.txt');
const exampleFilePart1 = fs.readFileSync(examplePathnamePart1, 'utf-8');
const exampleFilePart2 = fs.readFileSync(examplePathnamePart2, 'utf-8');
const examplePart1 = processFile(exampleFilePart1);
const examplePart2 = processFile(exampleFilePart2);

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
      `should return 165 for the example in Part 1.`
    ].join(''), () => {
      const solution = solverPart1(examplePart1);

      assert.strictEqual(solution, 165);
    });

    it([
      `should return 7 for the following test input:`,
      '           mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX',
      '           mem[8] = 3'
    ].join('\n'), () => {
      const testInput = [
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX',
        'mem[42] = 3'
      ].join('\n');
      const solution = solverPart1(processFile(testInput));

      assert.strictEqual(solution, 7);
    });

    it([
      `should return 7 for the following test input:`,
      '           mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX',
      '           mem[404] = 3'
    ].join('\n'), () => {
      const testInput = [
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX',
        'mem[404] = 3'
      ].join('\n');
      const solution = solverPart1(processFile(testInput));

      assert.strictEqual(solution, 7);
    });

    it([
      `should return 14 for the following test input:`,
      '           mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX',
      '           mem[42] = 3',
      '           mem[404] = 3',
    ].join('\n'), () => {
      const testInput = [
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX',
        'mem[42] = 3',
        'mem[404] = 3'
      ].join('\n');
      const solution = solverPart1(processFile(testInput));

      assert.strictEqual(solution, 14);
    });

    it([
      `should return 14 for the following test input:`,
      '           mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      '           mem[42] = 7',
      '           mem[404] = 7'
    ].join('\n'), () => {
      const testInput = [
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XX',
        'mem[42] = 7',
        'mem[404] = 7'
      ].join('\n');
      const solution = solverPart1(processFile(testInput));

      assert.strictEqual(solution, 14);
    });

    it([
      `should return 16 for the following test input:`,
      '           mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1X00',
      '           mem[42] = 3',
      '           mem[404] = 3',
    ].join('\n'), () => {
      const testInput = [
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1X00',
        'mem[42] = 3',
        'mem[404] = 3'
      ].join('\n');
      const solution = solverPart1(processFile(testInput));

      assert.strictEqual(solution, 16);
    });

    it([
      `should return 46 for the following test input:`,
      '           mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1X00',
      '           mem[42] = 3',
      '           mem[404] = 3',
      '           mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXX',
      '           mem[42] = 7',
      '           mem[404] = 7',
    ].join('\n'), () => {
      const testInput = [
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1X00',
        'mem[42] = 3',
        'mem[404] = 3',
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX',
        'mem[42] = 7',
        'mem[404] = 7'
      ].join('\n');
      const solution = solverPart1(processFile(testInput));

      assert.strictEqual(solution, 46);
    });

    it([
      `should return 31 for the following test input:`,
      '           mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1X00',
      '           mem[42] = 3',
      '           mem[404] = 3',
      '           mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXX',
      '           mem[42] = 7'
    ].join('\n'), () => {
      const testInput = [
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1X00',
        'mem[42] = 3',
        'mem[404] = 3',
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX',
        'mem[42] = 7'
      ].join('\n');
      const solution = solverPart1(processFile(testInput));

      assert.strictEqual(solution, 31);
    });
  });
});

describe('Day 14: Docking Data (Part 2)', () => {
  describe('applyMaskToAddress()', () => {
    // Given example.
    it([
      `should take the mask 000000000000000000000000000000X1001X and memory`,
      ' location 42 and return the following masks:\n',
      '          000000000000000000000000000000X1101X\n'
    ].join(''), () => {
      const mask = '000000000000000000000000000000X1001X';
      const memoryLocation = 42;
      const masked = applyMaskToAddress(mask, memoryLocation);
      const expected = '000000000000000000000000000000X1101X';

      assert.strictEqual(masked, expected);
    });

    // Given example.
    it([
      `should take the mask 00000000000000000000000000000000X0XX and memory`,
      ' location 26 and return the following masks:\n',
      '          00000000000000000000000000000001X0XX\n'
    ].join(''), () => {
      const mask = '00000000000000000000000000000000X0XX';
      const memoryLocation = 26;
      const masked = applyMaskToAddress(mask, memoryLocation);
      const expected = '00000000000000000000000000000001X0XX';

      assert.strictEqual(masked, expected);
    });

    it([
      `should take the mask 000000000000000000000000000000000000 and memory`,
      ' location 42 and return the following masks:\n',
      '          000000000000000000000000000000101010\n'
    ].join(''), () => {
      const mask = '000000000000000000000000000000000000';
      const memoryLocation = 42;
      const masked = applyMaskToAddress(mask, memoryLocation);
      const expected = '000000000000000000000000000000101010';

      assert.strictEqual(masked, expected);
    });

    it([
      `should take the mask 111111111111111111111111111111111111 and memory`,
      ' location 42 and return the following masks:\n',
      '          111111111111111111111111111111111111\n'
    ].join(''), () => {
      const mask = '111111111111111111111111111111111111';
      const memoryLocation = 42;
      const masked = applyMaskToAddress(mask, memoryLocation);
      const expected = '111111111111111111111111111111111111';

      assert.strictEqual(masked, expected);
    });

    it([
      `should take the mask XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX and memory`,
      ' location 42 and return the following masks:\n',
      '          XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n'
    ].join(''), () => {
      const mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      const memoryLocation = 42;
      const masked = applyMaskToAddress(mask, memoryLocation);
      const expected = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

      assert.strictEqual(masked, expected);
    });
  });

  describe('maskedAddressToDecimals()', () => {
    // Given example.
    it([
      `should return [ 26, 27, 58, 59 ] for the mask.`,
      ' 000000000000000000000000000000X1101X'
    ].join(''), () => {
      const maskedAddress = '000000000000000000000000000000X1101X';
      const solution = maskedAddressToDecimals(maskedAddress)
        .sort((a, b) => a - b);

      assert.deepStrictEqual(solution, [ 26, 27, 58, 59 ]);
    });

    // Given example.
    it([
      `should return [ 16, 17, 18, 19, 24, 25, 26, 27 ] for the mask.`,
      ' 00000000000000000000000000000001X0XX'
    ].join(''), () => {
      const maskedAddress = '00000000000000000000000000000001X0XX';
      const solution = maskedAddressToDecimals(maskedAddress)
        .sort((a, b) => a - b);

      assert.deepStrictEqual(solution, [ 16, 17, 18, 19, 24, 25, 26, 27 ]);
    });

    it([
      `should return [ 2, 3 ] for the mask.`,
      ' 00000000000000000000000000000000001X'
    ].join(''), () => {
      const maskedAddress = '00000000000000000000000000000000001X';
      const solution = maskedAddressToDecimals(maskedAddress)
        .sort((a, b) => a - b);

      assert.deepStrictEqual(solution, [ 2, 3 ]);
    });

    it([
      `should return [ 2, 3, 10, 11 ] for the mask.`,
      ' 00000000000000000000000000000000X01X'
    ].join(''), () => {
      const maskedAddress = '00000000000000000000000000000000X01X';
      const solution = maskedAddressToDecimals(maskedAddress)
        .sort((a, b) => a - b);

      assert.deepStrictEqual(solution, [ 2, 3, 10, 11 ]);
    });

    it([
      `should return [ 2 ] for the mask.`,
      ' 000000000000000000000000000000000010'
    ].join(''), () => {
      const maskedAddress = '000000000000000000000000000000000010';
      const solution = maskedAddressToDecimals(maskedAddress)
        .sort((a, b) => a - b);

      assert.deepStrictEqual(solution, [ 2 ]);
    });
  });

  describe('solverPart2()', () => {
    // Given example.
    it([
      `should return 208 for the example in Part 2.`
    ].join(''), () => {
      const solution = solverPart2(examplePart2);

      assert.strictEqual(solution, 208);
    });

    it([
      `should return 400 for the following test input:`,
      '           mask = 000000000000000000000000000000X1001X',
      '           mem[42] = 100'
    ].join('\n'), () => {
      const testInput = [
        'mask = 000000000000000000000000000000X1001X',
        'mem[42] = 100'
      ].join('\n');
      const solution = solverPart2(processFile(testInput));

      assert.strictEqual(solution, 400);
    });

    it([
      `should return 8 for the following test input:`,
      '           mask = 00000000000000000000000000000000X0XX',
      '           mem[26] = 1'
    ].join('\n'), () => {
      const testInput = [
        'mask = 00000000000000000000000000000000X0XX',
        'mem[26] = 1'
      ].join('\n');
      const solution = solverPart2(processFile(testInput));

      assert.strictEqual(solution, 8);
    });

    it([
      `should return 400 for the following test input:`,
      '           mask = 000000000000000000000000000000X1001X',
      '           mem[42] = 200',
      '           mask = 00000000000000000000000000000000X0XX',
      '           mem[26] = 2'
    ].join('\n'), () => {
      const testInput = [
        'mask = 000000000000000000000000000000X1001X',
        'mem[42] = 200',
        'mask = 00000000000000000000000000000000X0XX',
        'mem[26] = 2'
      ].join('\n');
      const solution = solverPart2(processFile(testInput));

      assert.strictEqual(solution, 416);
    });

    it([
      `should return 400 for the following test input:`,
      '           mask = 000000000000000000000000000000X1001X',
      '           mem[42] = 200',
      '           mask = 00000000000000000000000000000000X0XX',
      '           mem[26] = 1',
      '           mask = 000000000000000000000000000000X1001X',
      '           mem[42] = 100',
    ].join('\n'), () => {
      const testInput = [
        'mask = 000000000000000000000000000000X1001X',
        'mem[42] = 200',
        'mask = 00000000000000000000000000000000X0XX',
        'mem[26] = 2'
      ].join('\n');
      const solution = solverPart2(processFile(testInput));

      assert.strictEqual(solution, 208);
    });

    it([
      `should return 400 for the following test input:`,
      '           mask = 000000000000000000000000000000X1001X',
      '           mem[42] = 200',
      '           mask = 00000000000000000000000000000000X0XX',
      '           mem[26] = 1',
      '           mask = 00000000000000000000X000000000001001',
      '           mem[256] = 920',
    ].join('\n'), () => {
      const testInput = [
        'mask = 000000000000000000000000000000X1001X',
        'mem[42] = 200',
        'mask = 00000000000000000000000000000000X0XX',
        'mem[26] = 2',
        'mask = 00000000000000000000X000000000001001',
        'mem[256] = 920',
      ].join('\n');
      const solution = solverPart2(processFile(testInput));

      assert.strictEqual(solution, 2048);
    });
  });
});

// ===============
// == Functions ==
// ===============
