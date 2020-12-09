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
    `The solutions for 2020's "Day 9: Encoding Error" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================
interface Bags {
  [name: string]: Bag
}

interface Bag {
  name: string;
  content: ContentBag[];
}

interface ContentBag {
  name: string;
  amount: number;
}


// ===============
// == Functions ==
// ===============
/**
 * This fucntion returns the first weakness found in the XMAS data according to
 * the rules specified in the challenge.
 * @param {number[]} data The XMAS data.
 * @param {number} preambleSize The size of the preamble.
 */
export function findWeakness(data: number[], preambleSize: number = 25) {
  return -1;
}

/**
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day 9: Encoding Error" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {number[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string): number[] {
  return file.trim().split('\n').map(processEntry);
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 9: Encoding Error" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {number} An array where each line is an entry of the challenge.
 */
export function processEntry(entry: string): number {
  return Number(entry);
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 9: Encoding Error" challenge.
 * @param {number[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: number[]) {
  return -1;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 9: Encoding Error" challenge.
 * @param {number[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: number[]) {
  return -1;
}