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
 * @param {Entry[]} entries Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(entries: Entry[]) {
  const visited = {};
  let accumulator = 0;
  let currentPosition = 0;
  let looped = false;

  while (!looped) {
    const entry = entries[currentPosition];

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
export function solverPart2(entries: Entry[]) {
  const loop = walk(entries);
  const {
    visitedPath,
    visitedNop,
    visitedJmp
  } = loop;

  // Handling 'jmp' candidates.
  const jmpCanditates = visitedJmp.filter((i) => {
    const entry = entries[i];
    const replacedEntry = [ 'nop', entry[1] ] as Entry;
    const replacedNextIndex = getNextIndex(replacedEntry, i);
    let isSolution = false;

    if (!visitedPath.includes(replacedNextIndex)) {
      const tempEntries = [
        ...entries.slice(0, i),
        replacedEntry,
        ...entries.slice(i + 1)
      ];
      const tempWalkResults = walk(tempEntries, i);

      if (tempWalkResults.terminated) {
        isSolution = true;
      }
    }

    return isSolution;
  });

  // Handling 'nop' candidates.
  const nopCanditates = visitedNop.filter((i) => {
    const entry = entries[i];
    const replacedEntry = [ 'jmp', entry[1] ] as Entry;
    const replacedNextIndex = getNextIndex(replacedEntry, i);
    let isSolution = false;

    if (!visitedPath.includes(replacedNextIndex)) {
      const tempEntries = [
        ...entries.slice(0, i),
        replacedEntry,
        ...entries.slice(i + 1)
      ];
      const tempWalkResults = walk(tempEntries, i);

      if (tempWalkResults.terminated) {
        isSolution = true;
      }
    }

    return isSolution;
  });

  // Check that there is only one change that can be made, as specified in
  // the challenge.
  if (jmpCanditates.length + nopCanditates.length !== 1) {
    throw Error('Incorrect algorithm: more than one solution found.');
  }

  // Create a corrected boot record and calculate the value of the accumulator
  // for the correctly-running boot record.
  const corruptedIndex = Number([ ...jmpCanditates, ...nopCanditates ][0]);
  const replacementEntry: Entry = [
    jmpCanditates.length ? 'nop' : 'jmp',
    entries[corruptedIndex][1]
  ];
  const correctedEntries = [
    ...entries.slice(0, corruptedIndex),
    replacementEntry,
    ...entries.slice(corruptedIndex + 1)
  ];
  const correctedWalkResults = walk(correctedEntries);

  return correctedWalkResults.accumulator;
}

/**
 * This functions walks through the entries given and returns details
 * about the path walked.
 * @param {Entry[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function walk(entries: Entry[], startPosition: number = 0): WalkResults {
  const visited = {};
  const visitedPath = [];
  const visitedNop = [];
  const visitedJmp = [];
  let accumulator = 0;
  let currentPosition = startPosition;
  let nextPosition = currentPosition;
  let looped = false;
  let outOfRange = false;
  let terminated = false;

  while (!looped && !outOfRange && !terminated) {
    const entry = entries[currentPosition];

    if (!entry) {
      outOfRange = true;
      break;
    }

    const [ instruction, arg ] = entry;

    visitedPath.push(currentPosition);

    if (currentPosition === entries.length - 1) {
      if (
        instruction === 'nop'
        || instruction === 'acc'
        || (instruction === 'jmp' && arg === 1)
      ) {
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

/**
 * This function returns the index of the next entry given the current entry
 * and its index.
 * @param {Entry} entry A given entry.
 * @param {number} index The index corrresponding to the given entry.
 * @returns {number} The index of the next entry.
 */
export function getNextIndex(entry: Entry, index: number) {
  const [ instruction, arg ] = entry;

  if (instruction === 'nop' || instruction === 'acc') {
    return index + 1;
  }
  else if (instruction === 'jmp') {
    return index + arg;
  }
  else {
    throw Error('Something went horribly wrong in getNextIndex().');
  }
}