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
    `The solutions for 2020's "Day 1: Report Repair" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));  
}


// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processLine` function process an input file of
 * the Advent of Code 2020's "Day 2: Password Philosophy" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {Entry[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n').map(Number);
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 1: Report Repair" challenge.
 * @param {number[]} input An array containing numbers specified to be solved
 *     according to the challenge's description.
 * @returns {number} The product of the two numbers that satisifies the
 *     condition described in Part 1 of the challenge.
 */
export function solverPart1(input: number[], total: number = 2020) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (
        i !== j
        && (input[i] + input[j]) === total
      ) {
        return input[i] * input[j];
      }
    }
  }

  throw Error('There are no pairs that sum up to 2020 in the input!');
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 1: Report Repair" challenge.
 * @param {number[]} input An array containing numbers specified to be solved
 *     according to the challenge's description.
 * @returns {number} The product of the three numbers that satisifies the
 *     condition described in Part 2 of the challenge.
 */
export function solverPart2(input: number[], total: number = 2020) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      for (let k = 0; k < input.length; k++) {
        if (
          i !== j
          && i !== k
          && j !== k
          && (input[i] + input[j] + input[k]) === total
        ) {
          return input[i] * input[j] * input[k];
        }
      }
    }
  }

  throw Error('There are no three numbers that sum up to 2020 in the input!');
}