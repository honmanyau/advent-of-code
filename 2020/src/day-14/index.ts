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
    `The solutions for 2020's "Day 14: Docking Data" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================
interface Instruction {
  type: 'mask' | 'write';
  mask?: string;
  write: [ MemoryLocation, Value ]
}

type Program = Instruction[];
type MemoryLocation = number;
type Value = string;


// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day 14: Docking Data" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string): Program {
  const lines = file.trim().split('\n');
  const instructions = lines.map(processEntry);

  return instructions;
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 14: Docking Data" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string} An array where each line is an entry of the challenge.
 */
export function processEntry(entry: string): Instruction {
  const maskMatched = entry.match(/^mask = ([X01]{36})$/);
  const instruction: Instruction = {} as Instruction;

  if (maskMatched) {
    instruction.type = 'mask';
    instruction.mask = maskMatched[1];
  }
  else {
    const writeMached = entry.match(/^mem\[(\d+?)\] = (\d+?)$/);

    instruction.type = 'write';
    instruction.write = [
      Number(writeMached[1]), Number(writeMached[2]).toString(2)
    ];
  }

  return instruction;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 14: Docking Data" challenge.
 * @param {string[]} program Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(program: Program) {
  const memory = {};
  let mask = program[0].mask;

  for (const instruction of program) {
    const { type } = instruction;

    if (type === 'mask') {
      mask = instruction.mask;
    }
    else {
      const [ memoryLocation, binaryNumber ] = instruction.write;
      const maskedBinaryNumber = applyMask(mask, binaryNumber);
      const maskedDecimalNumber = Number(`0b${maskedBinaryNumber}`);
  
      memory[memoryLocation] = maskedDecimalNumber;
    }
  }

  return Object.keys(memory).reduce((acc, memoryLocation) => {
    return acc + memory[memoryLocation];
  }, 0);
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 14: Docking Data" challenge.
 * @param {string[]} program Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(program: Program) {
  return -1;
}

/**
 * This function applies a bit mask to a string representing a binary value.
 * @param {string} mask A 36-bit bit mask.
 * @param {string} binaryNumber A binary number.
 * @returns {string} The result of applying a bit mask to the given number.
 */
export function applyMask(mask: string, binaryNumber: string): string {
  const paddedBinaryNumber = binaryNumber.padStart(36, '0');
  let maskedBinaryNumber = '';

  for (let i = 0; i < mask.length; i++) {
    const bitMask = mask[i];
    
    if (bitMask === 'X') {
      maskedBinaryNumber += paddedBinaryNumber[i];
    }
    else {
      maskedBinaryNumber += mask[i];
    }
  }

  return maskedBinaryNumber;
}

/**
 * This function applies a bit mask to a string representing a binary value.
 * @param {string} mask A 36-bit bit mask.
 * @param {number} memoryLocation A decimal address.
 * @returns {string} The result of applying a bit mask to the given number.
 */
export function applyMaskToAddress(
  mask: string, memoryLocation: number
): string {
  const paddedBinaryNumber = memoryLocation.toString(2).padStart(36, '0');
  let maskedBinaryNumber = '';

  for (let i = 0; i < mask.length; i++) {
    const bitMask = mask[i];
    
    if (bitMask === '0') {
      maskedBinaryNumber += paddedBinaryNumber[i];
    }
    else {
      maskedBinaryNumber += mask[i];
    }
  }

  return maskedBinaryNumber;
}

/**
 * This function converts a masked address to the corresponding decimal
 * addresses.
 * @param {string} maskedAddress A masked address.
 * @returns {number[]} An array of decimal addresses.
 */
export function maskedAddressToDecimals(maskedAddress: string): number[] {
  const decimalAddresses = [];
  const queue = [ maskedAddress ];

  while (queue.length) {
    const currentAddress = queue.shift();
    const indexOfFirstX = currentAddress.indexOf('X');
    const isFloating = !!~indexOfFirstX;

    if (isFloating) {
      const before = currentAddress.slice(0, indexOfFirstX);
      const after = currentAddress.slice(indexOfFirstX + 1);

      queue.push(before + '0' + after);
      queue.push(before + '1' + after);
    }
    else {
      decimalAddresses.push(Number(`0b${currentAddress}`));
    }
  }

  return decimalAddresses;
}