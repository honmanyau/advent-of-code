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
 * This function uses the `processLine` function process an input file of
 * the Advent of Code 2020's "Day 5: Binary Boarding" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n\n').map(processLine);
}

/**
 * This function processes the line of an input file according to the rules
 * listed in the challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {Passport} An array where each line is an entry of the challenge.
 */
export function processLine(line: string) {
  return line;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 5: Binary Boarding" challenge.
 * @param {any} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: any) {
  return -1;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 5: Binary Boarding" challenge.
 * @param {any} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: any) {
  return -1;
}