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
    `The solutions for 2020's "Day 20: Jurassic Jigsaw" are:`,
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
 * the Advent of Code 2020's "Day 20: Jurassic Jigsaw" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  const lines = file.trim().split('\n').concat([ '' ]);
  const tiles = {};
  let id: number = null;
  let data: string[] = [];

  for (const line of file.trim().split('\n')) {
    if (line.trim().length === 0) {
      tiles[id] = { data };
      id = null;
      data = [];
      continue;
    }

    const matched = line.match(/^Tile (\d+):$/);

    if (matched) {
      id = Number(matched[1]);
    }
    else {
      data.push(line);
    }
  }

  return tiles;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 20: Jurassic Jigsaw" challenge.
 * @param {any} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: any) {
  return -1;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 20: Jurassic Jigsaw" challenge.
 * @param {any} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: any) {
  return -1;
}