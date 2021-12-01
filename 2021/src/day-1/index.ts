import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = part1Solver(challenge);
  const solutionPart2 = part2Solver(challenge);

  console.log([
    `The solutions for 2020's "Day 1: Sonar Sweep" are:`,
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
 * The solver function for Part 1 of the Advent of Code 2021's
 * "Day 1: Sonar Sweep" challenge.
 * @param {number[]} input An array that represents the puzzle's input.
 * @returns {number} The solution to Part 1 of the puzzle!
 */
export function part1Solver(input: number[]) {

}

/**
 * The solver function for Part 2 of the Advent of Code 2021's
 * "Day 1: Sonar Sweep" challenge.
 * @param {number[]} input An array that represents the puzzle's input.
 * @returns {number} The solution to Part 2 of the puzzle!
 */
export function part2Solver(input: number[]) {

}