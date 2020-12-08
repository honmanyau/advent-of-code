import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);
  // const solutionPart2 = solverPart2(challenge);

  console.log([
    `The solutions for 2020's "Day 8: Handheld Halting" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    // `  * Part 2: ${green(solutionPart2)}`
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

type Instruction = 'nop' | 'acc' | 'jmp' | '---';
type Entry = [ Instruction, number ];


// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day 8: Handheld Halting" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n').map(processEntry);
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 8: Handheld Halting" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {Entry} An array where each line is an entry of the
 *     challenge.
 */
export function processEntry(entry: string): Entry {
  const [ instruction, argString ] = entry.split(' ') as Entry;

  return [ instruction, Number(argString) ];
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 8: Handheld Halting" challenge.
 * @param {Entry[]} instructions Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(instructions: Entry[]) {
  let accumulator = 0;
  let currentPosition = 0;
  let looped = false;

  while (!looped) {
    const entry = instructions[currentPosition];

    if (!entry) {
      throw Error('Out of range: there is no infinite loop.');
    }

    const [ instruction, arg ] = entry;

    if (instruction === '---') {
      looped = true;
      break;
    }
    else {
      instructions[currentPosition][0] = '---';

      switch(instruction) {
        case 'nop':
          currentPosition += 1;

          break;
        case 'acc':
          currentPosition += 1;
          accumulator += arg;

          break;
        case 'jmp':
          currentPosition += arg;

          break;
        default:
          throw Error('The program should never get to this point!');
      }
    }
  }

  return accumulator;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 8: Handheld Halting" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(istructions: Entry[]) {
  return -1E16;
}