import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './example.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);
  const solutionPart2 = solverPart2(challenge);

  console.log([
    `The solutions for 2020's "Day 17: Conway Cubes" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================
export interface Cube {
  [z: number] : {
    [y: number]: {
      [x: number]: Node;
    }
  }
}

export type Node = '.' | '#';

// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day 17: Conway Cubes" challenge.
 * @param {Cube} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string): Cube {
  const cube: Cube = {};

  cube[0] = {};

  file
    .trim()
    .split('\n')
    .forEach((line, y) => {
      if (!cube[0][y]) {
        cube[0][y] = {};
      }

      line.split('').forEach((node, x) => {
        cube[0][y][x] = node as Node;
      });
    });

  return cube;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 17: Conway Cubes" challenge.
 * @param {Cube} cube A Conway Cube.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(cube: Cube) {
  return -1;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 17: Conway Cubes" challenge.
 * @param {Cube} cube A Conway Cube.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(cube: Cube) {
  return -1;
}