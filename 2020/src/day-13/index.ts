import * as fs from 'fs';
import * as path from 'path';

import { green, logDuration } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);
  const solutionPart2 = logDuration(
    'solverPart2',
    () => solverPart2(challenge)
  );

  console.log([
    `The solutions for 2020's "Day 13: Shuttle Search" are:`,
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
 * the Advent of Code 2020's "Day 13: Shuttle Search" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string): [ string, string ] {
  return file.trim().split('\n') as [ string, string ];
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 13: Shuttle Search" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string} An array where each line is an entry of the challenge.
 */
export function processIds(line: string) {
  return line.replace(/\,x/g, '').split(',').map(Number);
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 13: Shuttle Search" challenge.
 * @param {[ string, string ]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: [ string, string ]) {
  const target = Number(input[0]);
  const ids = processIds(input[1]);
  let minId = 1E99;
  let difference = 1E99;
  
  for (const id of ids) {
    const minDifference = Math.ceil(target / id) * id - target;
    
    if (minDifference < difference) {
      minId = id;
      difference = minDifference;
    }
  }

  return minId * difference;
}

/**
 * This function uses the positions of two numbers in a timetable and return,
 * the base number and multipliers, that describes the pattern of their occurence
 * in the table that satisifies the index requirement in Part 2.
 * @param {number} a One of the two numbers to be analysed.
 * @param {number} b The other one of the two numbers to be analysed.
 * @param {(number | string)[]} timetable A timetable.
 * @returns {[ number, number ]} The base number and multiplier.
 */
export function findPattern(
  a: number, b: number, timetable: (number | string)[]
): [ number, number ] {
  const relativeIndexB = timetable.indexOf(b) - timetable.indexOf(a);
  const intersections = [];
  let i = 0;

  while (intersections.length < 3) {
    const timestampA = i * a;
    const timestampB = timestampA + relativeIndexB;

    if (timestampB % b === 0) {
      intersections.push(timestampA);
    }

    i += 1;
  }

  return [ intersections[0], intersections[1] - intersections[0] ];
}

/**
 * This function takes a pattern and an that was not used in the
 * generation of the pattern, and generates a new pattern that is a solution to
 * all ids that have been been involved in the history of that pattern. 
 * @param {[ number, number ]} pattern The base pattern.
 * @param {number} id The new id to be incorporated into the pattern.
 * @param {(string | number)[]} ids The original array of ids.
 * @returns {[ number, number ]} A new pattern.
 */
export function getNewPattern(
  pattern: [ number, number ],
  id: number,
  ids: (string | number)[]
): [ number, number ] {
  const idMax = Math.max(...(ids.filter((v) => v !== 'x') as number[]));
  const indexMax = ids.indexOf(idMax);
  const index = ids.indexOf(id);
  const offset = index - indexMax;
  const intersections = [];
  let multiplier = 0;

  while (intersections.length < 2) {
    const baseTimestamp = pattern[0] + pattern[1] * multiplier;
    const timestamp = baseTimestamp + offset;

    if (timestamp % id === 0) {
      intersections.push(baseTimestamp);
    }

    multiplier += 1;
  }

  return [ intersections[0], intersections[1] - intersections[0] ];
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 13: Shuttle Search" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: string | [ string, string ]) {
  const idsString = (typeof input === 'string') ? input : input[1];
  const ids = idsString.split(',').map((v) => v === 'x' ? v : Number(v));
  const sortedIds = (ids
    .filter((v) => v !== 'x') as number[])
    .sort((a: number, b: number) => b - a);
  const relativeIndices = sortedIds.map(
    (id) => ids.indexOf(id) - ids.indexOf(sortedIds[0])
  );
  let pattern = findPattern(sortedIds[0], sortedIds[1], ids);

  for (let i = 2; i < sortedIds.length; i++) {
    const id = sortedIds[i];
    
    pattern = getNewPattern(pattern, id, ids);
  }

  return pattern[0] - ids.indexOf(sortedIds[0]);
}

/**
 * First attempt of the solver function for Part 2 of the Advent of Code 2020's
 * "Day 13: Shuttle Search" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2Attempt1(input: string | [ string, string ]) {
  const idsString = (typeof input === 'string') ? input : input[1];
  const ids = idsString.split(',').map((v) => v === 'x' ? v : Number(v));
  const sortedIds = (ids
    .filter((v) => v !== 'x') as number[])
    .sort((a: number, b: number) => b - a);
  
  // Starting from the largest number should already reduce the search space
  // substantially. The basic steps of this solution involves finding the
  // multiples that satisify the index requirement in progressively smaller
  // pairs of numbers.
  const maxId = sortedIds[0];
  const maxIdIndex = ids.indexOf(maxId);
  let maxIdMultiple = 1;
  let stepSize = 1;
  let solved = false;

  while (!solved) {
    const referenceTimestamp = maxId * maxIdMultiple;

    // Loop through multiples of and find a solution that satisifies the
    // index requirement relative to the largest item in `sortedId`.
    for (let i = 1; i < sortedIds.length; i++) {
      const currentId = sortedIds[i];
      const currentIdIndex = ids.indexOf(currentId);
      const relativeIndex = currentIdIndex - maxIdIndex;
      const relativeTimestamp = referenceTimestamp + relativeIndex;
      
      if (relativeTimestamp % currentId !== 0) {
        break;
      }
      else {
        stepSize = maxIdMultiple;

        if (i === sortedIds.length - 1) {
          // All ids satisify the index requirement.
          return referenceTimestamp - maxIdIndex;
        }
      }
    }

    maxIdMultiple += stepSize;
  }

  throw Error('No solution found!');
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 13: Shuttle Search" challenge.
 * @param {string[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2Attempt2(input: string | [ string, string ]) {
  const idsString = (typeof input === 'string') ? input : input[1];
  const ids = idsString.split(',').map((v) => v === 'x' ? v : Number(v));
  const sortedIds = (ids
    .filter((v) => v !== 'x') as number[])
    .sort((a: number, b: number) => b - a);
  const relativeIndices = sortedIds.map(
    (id) => ids.indexOf(id) - ids.indexOf(sortedIds[0])
  );
  let pattern = findPattern(sortedIds[0], sortedIds[1], ids);
  let multiplier = 0;
  let solved = false;

  while (!solved) {
    let isSolutionMultiplier = true;

    for (let i = 2; i < sortedIds.length; i++) {
      const [ offset, increment ] = pattern;
      const id = sortedIds[i];
      const timestamp = offset + increment * multiplier + relativeIndices[i];

      isSolutionMultiplier = (isSolutionMultiplier) && (timestamp % id === 0);
    }

    solved = isSolutionMultiplier;

    if (!isSolutionMultiplier) {
      multiplier += 1;
    }
  }

  return pattern[0] + pattern[1] * multiplier - ids.indexOf(sortedIds[0]);
}