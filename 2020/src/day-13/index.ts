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
    `The solutions for 2020's "Day 13: Shuttle Search" are:`,
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
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day 13: Shuttle Search" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string): [ string, string ] {
  return file.trim().split('\n') as [ string, string ];
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 13: Shuttle Search" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string} An array where each line is an entry of the challenge.
 */
export function processIds(line: string) {
  return line.replace(/\,x/g, '').split(',').map(Number);
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 13: Shuttle Search" challenge.
 * @param {[ string, string ]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: [ string, string ]) {
  const target = Number(input[0]);
  const ids = processIds(input[1]);
  let minId = 1E99;
  let difference = 1E99;
  
  for (const id of ids) {
    const minDifference = Math.ceil(target / id) * id - target;
    
    if (minDifference < difference) {
      minId = id;
      difference = minDifference;
    }
  }

  return minId * difference;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 13: Shuttle Search" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: string[]) {
  return -1;
}