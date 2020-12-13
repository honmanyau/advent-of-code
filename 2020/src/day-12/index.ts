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
    `The solutions for 2020's "Day 12: Rain Risk" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================
export type Instruction = [ string, number ];


// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day X: XXXXXXX" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n').map(processEntry);
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day X: XXXXXXX" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string} An array where each line is an entry of the challenge.
 */
export function processEntry(entry: string): Instruction {
  return [ entry[0], Number(entry.slice(1)) ];
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day X: XXXXXXX" challenge.
 * @param {string[]} instructions Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(instructions: [ string, number ][]) {
  return -1E16;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day X: XXXXXXX" challenge.
 * @param {string[]} instructions Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(instructions: [ string, number ][]) {
  return -1E16;
}