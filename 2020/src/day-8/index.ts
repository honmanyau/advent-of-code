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

interface WalkResults {
  visitedPath: number[];
  visitedNop: number[];
  visitedJmp: number[];
  looped: boolean;
  outOfRange: boolean;
  terminated: boolean;
  accumulator: number;
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
  const visited = {};
  let accumulator = 0;
  let currentPosition = 0;
  let looped = false;

  while (!looped) {
    const entry = instructions[currentPosition];

    if (!entry) {
      throw Error('Out of range!');
    }

    const [ instruction, arg ] = entry;

    if (visited[currentPosition]) {
      looped = true;
      break;
    }
    else {
      visited[currentPosition] = true;

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
 * @param {Entry[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(instructions: Entry[]) {
  const visited = {};
  const loopedPath = [];
  const visitedNop = [];
  const visitedJmp = [];
  let accumulator = 0;
  let currentPosition = 0;

  // Find infinite path.
  let looped = false;

  while (!looped) {
    const entry = instructions[currentPosition];

    if (!entry) {
      throw Error('Out of range!');
    }

    const [ instruction, arg ] = entry;

    if (visited[currentPosition]) {
      looped = true;
      break;
    }
    else {
      visited[currentPosition] = true;
      loopedPath.push(currentPosition);

      switch(instruction) {
        case 'nop':
          currentPosition += 1;
          visitedNop.push(currentPosition);

          break;
        case 'acc':
          currentPosition += 1;
          accumulator += arg;

          break;
        case 'jmp':
          currentPosition += arg;
          visitedJmp.push(currentPosition);

          break;
        default:
          throw Error('The program should never get to this point!');
      }
    }
  }

  return accumulator;
}

/**
 * This functions walks through the instructions given and returns details
 * about the path walked.
 * @param {Entry[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function walk(instructions: Entry[]): WalkResults {
  const visited = {};
  const visitedPath = [];
  const visitedNop = [];
  const visitedJmp = [];
  let accumulator = 0;
  let currentPosition = 0;
  let nextPosition = currentPosition;
  let looped = false;
  let outOfRange = false;
  let terminated = false;

  // Find infinite path.

  while (!looped && !outOfRange && !terminated) {
    const entry = instructions[currentPosition];

    if (!entry) {
      outOfRange = true;
      break;
    }

    const [ instruction, arg ] = entry;

    visitedPath.push(currentPosition);

    if (currentPosition === instructions.length - 1) {
      if (instruction === 'nop' || instruction === 'acc') {
        terminated = true;
      }
    }

    if (visited[currentPosition]) {
      looped = true;
    }
    else {
      switch(instruction) {
        case 'nop':
          visitedNop.push(currentPosition);
          nextPosition = currentPosition + 1;
  
          break;
        case 'acc':
          nextPosition = currentPosition + 1;
          accumulator += arg;
  
          break;
        case 'jmp':
          visitedJmp.push(currentPosition);
          nextPosition = currentPosition + arg;
  
          break;
        default:
          throw Error('The program should never get to this point!');
      }
    }

    visited[currentPosition] = true;
    currentPosition = nextPosition;
  }

  return {
    visitedPath,
    visitedNop,
    visitedJmp,
    looped,
    outOfRange,
    terminated,
    accumulator
  };
}