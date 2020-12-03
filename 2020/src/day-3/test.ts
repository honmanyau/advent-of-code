import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import { processFile, solverPart1 } from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 3: Toboggan Trajectory', () => {
  it([
    `solverPart1() should return ${yellow(7)} for the example input.`
  ].join(''), () => {
    const solution = solverPart1(example);

    assert.strictEqual(solution, 7);
  });

  it([
    `solverPart1() should return ${yellow(8)} for the example input if the`,
    ' the fourth character in the second line is changed to a # character'
  ].join(''), () => {
    const modifiedExample = [ ...example ];

    modifiedExample[1] = replaceCharOf(modifiedExample[1]).at(3).with('#');

    const solution = solverPart1(modifiedExample);

    assert.strictEqual(solution, 8);
  });

  it([
    `solverPart1() should return ${yellow(6)} for the example input if the`,
    ' the fourth character in the second line is changed to a . character'
  ].join(''), () => {
    const modifiedExample = [ ...example ];

    modifiedExample[2] = replaceCharOf(modifiedExample[2]).at(6).with('.');

    const solution = solverPart1(modifiedExample);

    assert.strictEqual(solution, 6);
  });

  it([
    `solverPart1() should return ${yellow(0)} for the test input:`,
    ` [ '....', '....', '....' ]`
  ].join(''), () => {
    const testInput = [ '....', '....', '....' ];
    const solution = solverPart1(testInput);

    assert.strictEqual(solution, 0);
  });

  it([
    `solverPart1() should return ${yellow(1)} for the test input:`,
    ` [ '....', '...#', '....' ]`
  ].join(''), () => {
    const testInput = [ '....', '...#', '....' ];
    const solution = solverPart1(testInput);

    assert.strictEqual(solution, 1);
  });

  it([
    `solverPart1() should return ${yellow(0)} for the test input:`,
    ` [ '...', '...', '...' ]`
  ].join(''), () => {
    const testInput = [ '...', '...', '...' ];
    const solution = solverPart1(testInput);

    assert.strictEqual(solution, 0);
  });

  it([
    `solverPart1() should return ${yellow(1)} for the test input:`,
     `[ '...', '#..', '...' ]`
  ].join(''), () => {
    const testInput = [ '...', '#..', '...' ];
    const solution = solverPart1(testInput);

    assert.strictEqual(solution, 1);
  });

  it([
    `solverPart1() should return ${yellow(2)} for the test input:`,
    ` [ '...', '#..', '#..' ]`
  ].join(''), () => {
    const testInput = [ '...', '#..', '#..' ];
    const solution = solverPart1(testInput);

    assert.strictEqual(solution, 2);
  });

  it([
    `solverPart1() should throw an error if the number of rows in the input`,
    ' does not allow the toboggan to traverse vertically perfectly to the',
    ' bottom'
  ].join(''), () => {
    const testInput = [ '...' ];

    assert.throws(() => solverPart1(testInput), Error);
  });
});

/**
 * This function replaces a character in a given string with the given character
 * and at the given index.
 * @param {string} original The string to be replaced.
 * @param {number} number The index of the character to be replaced.
 * @param {string} character The character to be replaced with.
 * @returns {string} The new string formed after replacement.
 */
function replaceChar(original: string, index?: number, character?: string ) {
  if (arguments.length === 3) {
    return original.slice(0, index) + character + original.slice(index + 1);
  }

  return {
    at: function replaceCharAt(i: number) {
      return {
        with: function replaceCharWith(c: string) {
          return (
            original.slice(0, i) + c + original.slice(i + 1)
          );
        }
      };
    }
  };
}

/**
 * This function is an alternate "form" of `replaceChar()`, which allows a the
 * operation to be done fun-ctionally while reading like a sentence.
 * @param {string} original The string to be replaced.
 * @returns {object} An nested object containing the subsequent functions to
 *     be called.
 */
function replaceCharOf(original: string) {
  return {
    at: function replaceCharAt(index: number) {
      return {
        with: function replaceCharWith(character: string) {
          return (
            original.slice(0, index) + character + original.slice(index + 1)
          );
        }
      };
    }
  };
}