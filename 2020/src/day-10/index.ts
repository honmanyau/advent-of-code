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
    `The solutions for 2020's "Day 10: Adapter Array" are:`,
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
 * This function processes an input file of the Advent of Code 2020's
 * "Day 10: Adapter Array" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n').map(Number);
}

/**
 * This function sorts a list of adapter joltages, appends the voltage of the
 * device, and returns the differences between them.
 * @param {number[]} adapters A list of adapter joltages.
 * @returns A list of joltage differences.
 */
export function calcDifferences(adapters: number[]) {
  const allJoltagesSorted = [ ...adapters ].sort((a, b) => a - b);

  allJoltagesSorted.push(allJoltagesSorted[allJoltagesSorted.length - 1] + 3);

  const differences = allJoltagesSorted.map((joltage, i) => {
    const prevJoltage = allJoltagesSorted[i - 1] || 0;
    const difference = joltage - prevJoltage;

    if (difference <= 0 || difference >= 4) {
      throw Error('Invalid solution found!');
    }

    return joltage - prevJoltage;
  });

  return differences;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 10: Adapter Array" challenge.
 * @param {number[]} adapters Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(adapters: number[]) {
  return -1;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 10: Adapter Array" challenge.
 * @param {number[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(adapters: number[]) {
  return -1;
}