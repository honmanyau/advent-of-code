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
    `The solutions for 2020's "Day 2: Password Philosophy" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));

  
}

// ================
// == Interfaces ==
// ================
interface Entry {
  min: number;
  max: number;
  letter: string;
  password: string;
}


// ===============
// == Functions ==
// ===============
/**
 * This function process each line of the Advent of Code 2020's
 * "Day 2: Password Philosophy" challenge.
 * @param {string} line A line of the input.
 * @returns {Entry} An object containing the parameters of each entry.
 */
export function processLine(line: string) {
  const [ range, letter, password ] = line.replace(':', '').split(' ');
  const [ min, max ] = range.split('-').map(Number);

  return { min, max, letter, password };
}

/**
 * This function uses the `processLine` function process an input file of
 * the Advent of Code 2020's "Day 2: Password Philosophy" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {Entry[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n').map(processLine);
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 2: Password Philosophy" challenge.
 * @param {Entry[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: Entry[]) {
  let numValidPasswords = 0;

  for (const entry of input) {
    const { min, max, letter, password } = entry;

    if (min > max) {
      throw Error('An entry with `min` > `max` was provided!');
    }

    const re = new RegExp(letter, 'g');
    const matched = password.match(re);
    const numLettersFound = matched ? matched.length : 0;
    const isValidPassword = numLettersFound >= min
      && numLettersFound <= max;

    if (isValidPassword) {
      numValidPasswords += 1;
    }
  }

  return numValidPasswords;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 2: Password Philosophy" challenge.
 * @param {Entry[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: Entry[]) {
  let numValidPasswords = 0;

  for (const entry of input) {
    const { min, max, letter, password } = entry;
    const lower = min - 1;
    const upper = max - 1;
    const firstLetter = password[lower];
    const secondLetter = password[upper];
    const firstMatched = firstLetter === letter
      && secondLetter !== letter;
    const secondMatched = firstLetter !== letter
      && secondLetter === letter;

    if (!password[lower] || !password[upper]) {
      throw Error('An entry containing a out-of-range index was found!');
    }

    if (firstMatched || secondMatched) {
      numValidPasswords += 1;
    }
  }

  return numValidPasswords;
}