import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);

  console.log([
    `The solutions for 2020's "Day 3: Toboggan Trajectory" are:`,
    `  * Part 1: ${green(solutionPart1)}`
  ].join('\n'));

  
}

// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processLine` function process an input file of
 * the Advent of Code 2020's "Day 2: Password Philosophy" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n');
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 2: Password Philosophy" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: string[]) {
  const sy = 1;
  const sx = 3;

  if (input.length <= sy) {
    throw Error([
      'The number of lines in the map does not allow the toboggan to traverse',
      ' vertically even once!'
    ].join(''));
  }

  let numTreesEncountered = 0;

  for (let y = 0, x = 0; y < input.length; y += sy, x += sx) {
    const wrappedX = x % input[y].length;
    
    if (input[y][wrappedX] === '#') {
      numTreesEncountered += 1;
    }
  }

  return numTreesEncountered;
}