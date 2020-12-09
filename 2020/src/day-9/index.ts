import { lookup } from 'dns';
import * as fs from 'fs';
import { platform } from 'os';
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
interface LookupItem {
  number: number;
  sums: number[];
}


// ===============
// == Functions ==
// ===============
/**
 * This function finds the first contiguous set that sums up to the weakness in
 * a given set of XMAS data.
 * @param {number[]} data The XMAS data.
 * @param {number} preambleSize The size of the preamble.
 */
export function findContiguousSet(data: number[], preambleSize: number) {
  const weakness = findWeakness(data, preambleSize);

  for (let i = 0; i < data.length; i++) {
    const currentSet = [];
    let sum = 0;

    if (data[i] === weakness) {
      continue;
    }
    else {
      for (let j = i; j < data.length && sum < weakness; j++) {
        const currentNumber = data[j];
        const nextSum = sum + currentNumber;

        sum = nextSum;
        currentSet.push(currentNumber);
      }

      if (sum === weakness) {
        return currentSet;
      }
    }
  }
}



/**
 * This fucntion returns the first weakness found in the XMAS data according to
 * the rules specified in the challenge.
 * @param {number[]} data The XMAS data.
 * @param {number} preambleSize The size of the preamble.
 */
export function findWeakness(data: number[], preambleSize: number) {
  const preamble = data.slice(0, preambleSize);
  const lookup = createLookup(preamble);
  let weakness = null;

  for (let i = preambleSize; i < data.length; i++) {
    const currentNumber = data[i];
    let found = false;

    for (let j = 0; j < lookup.length && !found; j++) {
      const partialSums = lookup[j].sums.slice(j + 1);
      
      found = found || partialSums.includes(currentNumber);
    }
    
    if (found) {
      updateTable(lookup, currentNumber);
      continue;
    }
    else {
      weakness = currentNumber;
      break;
    }
  }

  if (weakness === null) {
    throw Error('No weakness found in the XMAS data!');
  }
  
  return weakness;
}

/**
 * This function creates a lookup table for the sums of the numbers in a given
 * preamble.
 * @param {number[]} preamble A preamble.
 * @returns {LookupItem[]} The lookup table.
 */
export function createLookup(preamble: number[]) {
  const lookup = [];

  for (let i = 0; i < preamble.length; i++) {
    const number = preamble[i];

    lookup.push({
      number: number,
      sums: preamble.map((val, j) => i === j ? null : number + val)
    });
  }

  return lookup;
}

/**
 * This function updates a lookup table with a new value to minimise
 * recalculation associated with creating a new table.
 * @param {number[]} lookup A lookup table created with `createTable()`.
 * @param {number} newNumber The number to be added to the table.
 * @returns {LookupItem[]} The lookup table.
 */
export function updateTable(lookup: LookupItem[], newNumber: number) {
  const firstItem = lookup.shift();
  const newItem: LookupItem = {
    number: newNumber,
    sums: []
  };
  
  for (const item of lookup) {
    const { number, sums } = item;
    
    sums.shift();
    sums.push(number + newNumber);
    newItem.sums.push(number + newNumber);
  }

  newItem.sums.push(null);
  lookup.push(newItem);

  return lookup;
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
 * @param {number[]} data Entries of the challenge.
 * @param {number} preambleSize The size of the preamble.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(data: number[], preambleSize: number = 25) {
  return findWeakness(data, preambleSize);
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 9: Encoding Error" challenge.
 * @param {number[]} data Entries of the challenge.
 * @param {number} preambleSize The size of the preamble.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(data: number[], preambleSize: number = 25) {
  const contiguousSet = findContiguousSet(data, preambleSize);

  return Math.min(...contiguousSet) + Math.max(...contiguousSet);
}
