import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  // const solutionPart1 = solverPart1(challenge);

  console.log([
    `The solutions for 2020's "Day 6: Custom Customs" are:`,
    // `  * Part 1: ${green(solutionPart1)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================


// ===============
// == Functions ==
// ===============
/**
 * This function creates a dictionary for the questions that people in a group
 * have answered yes.
 * @param {string} input The answers for a given group.
 * @returns The number of unique answers that people have answered yes to. 
 */
export function countUniqueYeses(input: string[]) {
  return -1;
}

/**
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day 6: Custom Customs" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[][]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n\n').map(processEntry);
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 6: Custom Customs" challenge.
 * @param {string[]} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processEntry(entry: string) {
  return entry.split('\n');
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 6: Custom Customs" challenge.
 * @param {any} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: string[]) {
  return -1;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 6: Custom Customs" challenge.
 * @param {any} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: string[]) {
  return -1;
}