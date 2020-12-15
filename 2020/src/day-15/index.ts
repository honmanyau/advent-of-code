import * as fs from 'fs';
import * as path from 'path';

import { logDuration } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);
  const solutionPart2 = logDuration(
    'solverPart2()',
    () => solverPart2(challenge)
  );

  console.log([
    `The solutions for 2020's "Day 15: Rambunctious Recitation" are:`,
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
 * the Advent of Code 2020's "Day 15: Rambunctious Recitation" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split(',').map(Number);
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 15: Rambunctious Recitation" challenge.
 * @param {number[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: number[]) {
  return play(input, 2020);
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 15: Rambunctious Recitation" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: number[]) {
  return play(input, 30000000);
}

/**
 * This funtion plays the Elves' game for a given number of turns.
 * @param {number[]} input The starting numbers being spoken.
 * @param {number} turns The number of turns to simulate the game for.
 */
export function play(input, turns) {
  if (turns <= input.length) {
    return input[turns - 1];
  }

  const memory = {};
  let lastSpoken = -1;

  lastSpoken = input[0];

  for (let i = 1; i < input.length; i++) {
    const key = `m${lastSpoken}`;

    memory[key] = [ null, i - 1 ];

    lastSpoken = input[i];
  }
    
  for (let i = 3; i < turns; i++) {
    const key = `m${lastSpoken}`;

    if (!memory[key]) {
      memory[key] = [ null, i - 1 ];

      lastSpoken = 0;
    }
    else {
      memory[key][0] = memory[key][1];
      memory[key][1] = (i - 1);
      lastSpoken = memory[key][1] - memory[key][0];
    }
  }

  return lastSpoken;
}