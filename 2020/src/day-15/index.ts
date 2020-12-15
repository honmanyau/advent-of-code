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
  return file.trim().split('\n').map(processEntry);
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 15: Rambunctious Recitation" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string} An array where each line is an entry of the challenge.
 */
export function processEntry(entry: string) {
  return entry;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 15: Rambunctious Recitation" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: string[]) {
  return -1;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 15: Rambunctious Recitation" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: string[]) {
  return -1;
}

/**
 * This funtion plays the Elves' game for a given number of turns.
 * @param {number[]} input The starting numbers being spoken.
 * @param {number} turns The number of turns to simulate the game for.
 */
export function play(input, turns) {
  const memory = {};
  let lastSpoken = -1;

  lastSpoken = input[0];
    
  for (let i = 1; i < turns; i++) {
    if (i < input.length) {
      memory[lastSpoken] = [ i - 1 ];

      lastSpoken = input[i];
    }
    else {
      const lastSpokenMemory = memory[lastSpoken];

      if (!lastSpokenMemory) {
        memory[lastSpoken] = [ i - 1 ];

        lastSpoken = 0;
      }
      else {
        lastSpokenMemory.push(i - 1);
        
        const lastTwoTurns = lastSpokenMemory.slice(-2);
        const difference = lastTwoTurns[1] - lastTwoTurns[0];

        lastSpoken = difference;
      }
    }
  }

  console.log(lastSpoken);

  // if (t < input.length) {
  //   return input[t];
  // }
  // else {
  //   lastSpoken = input[0];
    
  //   for (let i = 1; i < input.length - 1; i++) {
  //     if (!memory[lastSpoken]) {
  //       memory[lastSpoken] = [ i - 1 ];

  //       lastSpoken = input[i];
  //     }
  //     else {
  //       throw Error('This should never run for the given input!');
  //     }
  //   }

  //   console.log('=====', lastSpoken);

  //   for (let i = input.length; i < turns; i++) {
  //     const lastSpokenMemory = memory[lastSpoken];
  //     console.log('=====', memory, lastSpokenMemory);
  //     if (!lastSpokenMemory) {
  //       memory[lastSpoken] = [ i ];

  //       lastSpoken = 0;
  //     }
  //     else {
  //       lastSpokenMemory.push(i);

  //       const lastTwoTurns = memory[lastSpoken].slice(-2);
  //       const difference = lastTwoTurns[1] - lastTwoTurns[0];

  //       lastSpoken = difference;
  //     }
  //   }
  // }

  return lastSpoken;
}