import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);

  console.log([
    `The solutions for 2020's "Day 4: Passport Processing" are:`,
    `  * Part 1: ${green(solutionPart1)}`
  ].join('\n'));
}

// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processLine` function process an input file of
 * the Advent of Code 2020's "Day 4: Passport Processing" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n\n').map((line) => line.split(/\s/));
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 4: Passport Processing" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: string[][]) {
  return -1;
}