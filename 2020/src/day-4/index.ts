import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  // const solutionPart1 = solverPart1(challenge);

  console.log([
    `The solutions for 2020's "Day 4: Passport Processing" are:`,
    // `  * Part 1: ${green(solutionPart1)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================
interface Passport extends Object {
  ecl?: string;
  pid?: string | number;
  eyr?: string | number;
  hcl?: string; // Hex string.
  byr?: string | number;
  iyr?: string | number;
  cid?: string | number;
  hgt?: string | number; // Height in cm.
}


// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processLine` function process an input file of
 * the Advent of Code 2020's "Day 4: Passport Processing" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n\n').map(processLine);
}

/**
 * This function processes the line of an input file according to the rules
 * listed in the challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {Passport} An array where each line is an entry of the challenge.
 */
export function processLine(line: string) {
  const fields = line.split(/[\s\n]/);
  const passport: Passport = {};

  for (const field of fields) {
    const [ property, value ] = field.split(':');

    passport[property] = value;
  }
  console.log(passport);
  return passport;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 4: Passport Processing" challenge.
 * @param {Passport[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: Passport[]) {
  let numValidPassports = 0;

  for (const passport of input) {
    const numFieldsPresent = Object.keys(passport).length;
    const isValidPassport = numFieldsPresent === 8;
    const isValidNPC = numFieldsPresent === 7
      && !passport.hasOwnProperty('cid');

      numValidPassports += Number(isValidPassport || isValidNPC);
  }

  return numValidPassports;
}