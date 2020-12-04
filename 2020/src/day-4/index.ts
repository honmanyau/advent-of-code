import * as fs from 'fs';
import * as path from 'path';
import { stringify } from 'querystring';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);

  console.log([
    `The solutions for 2020's "Day 4: Passport Processing" are:`,
    `  * Part 1: ${green(solutionPart1)}`
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

/**
 * This function validate the 'byr' field of a `Passport` according to the
 * following criteria: four digits; at least 1920 and at most 2002.
 * @param {string} input The value of the 'byr' field of a `Passport`. 
 * @returns {boolean} Whether or not the input is valid.
 */
export function validateByr(input: string) {
  return validateYear(input, 1920, 2002);
}

/**
 * This function validate the 'ecl' field of a `Passport` according to the
 * following criteria: exactly one of: amb blu brn gry grn hzl oth.
 * @param {string} input The value of the 'ecl' field of a `Passport`. 
 * @returns {boolean} Whether or not the input is valid.
 */
export function validateEcl(input: string) {
  return [ 'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth' ].includes(input);
}

/**
 * This function validate the 'eyr' field of a `Passport` according to the
 * following criteria: four digits; at least 2020 and at most 2030.
 * @param {string} input The value of the 'eyr' field of a `Passport`. 
 * @returns {boolean} Whether or not the input is valid.
 */
export function validateEyr(input: string) {
  return validateYear(input, 2020, 2030);
}

/**
 * This function validate the 'hcl' field of a `Passport` according to the
 * following criteria: a # followed by exactly six characters 0-9 or a-f.
 * @param {string} input The value of the 'hcl' field of a `Passport`. 
 * @returns {boolean} Whether or not the input is valid.
 */
export function validateHcl(input: string) {
  const matched = input.match(/^#[0-9a-f]{6}$/);

  return !!matched;
}

/**
 * This function validate the 'hgt' field of a `Passport` according to the
 * criteria that a number followed by either cm or in:
 *  * If cm, the number must be at least 150 and at most 193.
 *  * If in, the number must be at least 59 and at most 76.
 * @param {string} input The value of the 'hgt' field of a `Passport`. 
 * @returns {boolean} Whether or not the input is valid.
 */
export function validateHgt(input: string) {
  const matched = input.match(/^(\d+)+?(cm)$/)
    || input.match(/^(\d+)+?(in)$/);

  if (!matched) {
    return false;
  }

  const [ _input, height, unit ] = matched;

  if (unit === 'cm') {
    return validateRange(height, 150, 193);
  }
  else if (unit === 'in') {
    return validateRange(height, 59, 76);
  }
  else {
    return false; // Should never get to this fallback.
  }
}

/**
 * This function validate the 'iyr' field of a `Passport` according to the
 * following criteria: four digits; at least 2010 and at most 2020.
 * @param {string} input The value of the 'iyr' field of a `Passport`. 
 * @returns {boolean} Whether or not the input is valid.
 */
export function validateIyr(input: string) {
  return validateYear(input, 2010, 2020);
}

/**
 * This function validate the 'pid' field of a `Passport` according to the
 * following criteria: a nine-digit number, including leading zeroes.
 * @param {string} input The value of the 'pid' field of a `Passport`. 
 * @returns {boolean} Whether or not the input is valid.
 */
export function validatePid(input: string) {
  const matched = input.match(/^[0-9]{9}$/);

  return !!matched;
}

/**
 * This function validate a four-digit value in the given range (inclusive) that
 * represents a year.
 * @param {string} input The value to be validated.
 * @param {number} min The lower end of the range to be validated against.
 * @param {number} maximum The upper end of the range to be validated against.
 * @returns {boolean} Whether or not the input is valid.
 */
export function validateYear(input: string, min: number, max: number) {
  if (input.length !== 4) {
    return false;
  }
  
  return validateRange(input, min, max);
}

/**
 * This function a number against the range provided (inclusive).
 * @param {string} input The value to be validated.
 * @param {number} min The lower end of the range to be validated against.
 * @param {number} maximum The upper end of the range to be validated against.
 * @returns {boolean} Whether or not the input is valid.
 */
export function validateRange(input: string, min: number, max: number) {
  const year = Number(input);
  
  if (year < min || year > max) {
    return false;
  }
  else {
    return true;
  }
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 4: Passport Processing" challenge.
 * @param {Passport[]} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: Passport[]) {
  let numValidPassports = -1;
  
  return numValidPassports;
}