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
export type Direction = 'N' | 'E' | 'S' | 'W';


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

/**
 * This function takes the current direction and an `Instrution` as arguments
 * and return the new direction and distance that one should travel.
 * @param {Direction} direction The current direction of the ship.
 * @param {Instruction} instruction A set of navigation instructions.
 * @returns {Instruction} Instruciton for the direction and distance to travel.
 */
export function navigate(direction: Direction, instruction: Instruction) {
  const [ steer, magnitude ] = instruction;
  const compass = [ 'N', 'E', 'S', 'W' ];
  
  switch(steer) {
    case 'F':
      return [ direction, magnitude ];
    case 'N':
    case 'E':
    case 'S':
    case 'W':
      return [ steer, magnitude ];
    case 'L':
    case 'R':
      if (magnitude % 90 !== 0) {
        throw Error('Magnitude for turning is not divisible by 90!');
      }

      const l = compass.length;
      const currentIndex = compass.indexOf(direction);
      const turns = (magnitude / 90);
      const modifier = (steer === 'L') ? -1 : 1;
      const newIndex = (((currentIndex + modifier * turns) % l) + l) % l;
      console.log({ steer, magnitude, currentIndex, turns, modifier, newIndex});
      return [ compass[newIndex], 0 ];
    default:
      throw Error('Something went horribly wrong!');
  }
}