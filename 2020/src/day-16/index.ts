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
    `The solutions for 2020's "Day 16: Ticket Translation" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================
export interface Notes {
  rules: Rule;
  myTicket: number[];
  nearbyTickets: number[][]
}

interface Rule {
  [name: string]: [ Range, Range ]
}

type Range = [ number, number ];

// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day 16: Ticket Translation" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return processParts(file.trim().split('\n\n'));
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 16: Ticket Translation" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string} An array where each line is an entry of the challenge.
 */
export function processParts(parts: string[]): Notes {
  const [ rules, myTicket, nearbyTickets ] = parts;
  const notes: Notes = {
    rules: {},
    myTicket: [],
    nearbyTickets: []
  };
  console.log(rules, myTicket, nearbyTickets);
  // Process rules.
  rules.split('\n').forEach((line) => {
    const matched = line.match(/^(.+?): (.+) or (.+)$/);
    const [ _line, name, range1, range2 ] = matched;

    notes.rules[name] = [
      range1.split('-').map(Number) as Range,
      range2.split('-').map(Number) as Range
    ]
  });

  notes.myTicket = myTicket.split('\n')[1].split(',').map(Number);
  
  nearbyTickets.split('\n').forEach((line, i) => {
    if (i !== 0) {
      notes.nearbyTickets.push(line.split(',').map(Number));
    }
  });

  return notes;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 16: Ticket Translation" challenge. This is a naive solution so that
 * I can catch up on the days that I missed first, there appears to be
 * a few oportunities for optimisation, such as 1. values < lower end of
 * a pair of ranges is automatically invalid; 2. values > upper end of a pair of
 * ranges is also automatically invalid; 3. combine, sort, and filter for
 * both the ranges and tickets to facilitate binary or more efficient searches.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(notes: Notes) {
  const { rules, nearbyTickets } = notes;
  const allRanges: Range[] = [];
  let errorRate = 0;

  for (const rule in rules) {
    allRanges.push(...rules[rule]);
  }

  for (const ticket of nearbyTickets) {
    for (const value of ticket) {
      let valid = false;

      for (const range of allRanges) {
        if (value >= range[0] && value <= range[1]) {
          valid = true;
          break;
        }
      }

      if (!valid) {
        errorRate += value;
      }
    }
  }
  
  return errorRate;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 16: Ticket Translation" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(notes: Notes) {
  return -1;
}