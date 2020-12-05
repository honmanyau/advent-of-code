import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);
  const solutionPart2 = solverPart2(challenge);

  console.log([
    `The solutions for 2020's "Day 5: Binary Boarding" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================


// ===============
// == Functions ==
// ===============
/**
 * This function returns the column number for a string that specifies a seat.
 * @param {string} input A string that specifies a seat on the plane as
 *     described in the challenge.
 * @returns {number} The deciphered column number.
 */
export function getColNumber(input: string) {
  const matched = input.match(/^([FB]{7})([LR]{3})$/);
  const [ _seatString, _rowString, colString ] = matched;
  const binarsedCol = colString
    .replace(/L/g, '0')
    .replace(/R/g, '1');

  return parseInt(binarsedCol, 2);
}

/**
 * This function returns the row number for a string that specifies a seat.
 * @param {string} input A string that specifies a seat on the plane as
 *     described in the challenge.
 * @returns {number} The deciphered row number.
 */
export function getRowNumber(input: string) {
  const matched = input.match(/^([FB]{7})([LR]{3})$/);
  const [ _seatString, rowString ] = matched;
  const binarsedRow = rowString
    .replace(/F/g, '0')
    .replace(/B/g, '1');

  return parseInt(binarsedRow, 2);
}

/**
 * This function returns the seat ID for a string that specifies a seat.
 * @param {string} input A string that specifies a seat on the plane as
 *     described in the challenge.
 * @returns {number} The deciphered row number.
 */
export function getSeatId(input: string) {
  const matched = input.match(/^([FB]{7})([LR]{3})$/);

  if (!matched) {
    throw Error('Invalid seat string supplied.');
  }

  const rowNumber = getRowNumber(input);
  const colNumber = getColNumber(input);

  return rowNumber * 8 + colNumber;
}

/**
 * This function uses the `processLine` function process an input file of
 * the Advent of Code 2020's "Day 5: Binary Boarding" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n');
}

/**
 * This function reverses a string to avoid splitting, reversing and joining
 * using `Array.prototype` methods. Haven't actually tested which is more
 * performant, but it's likely that this is faster.
 * @param {string} input The string to be reversed.
 * @returns {string} The reversed string.
 */
export function reverseString(input: string) {
  let reversed = '';

  for (let i = input.length; i > 0; i--) {
    reversed += input[i - 1];
  }

  return reversed;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 5: Binary Boarding" challenge.
 * @param {any} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: string[]) {
  return -1;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 5: Binary Boarding" challenge.
 * @param {any} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: string[]) {
  return -1;
}