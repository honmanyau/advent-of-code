import * as fs from 'fs';
import * as path from 'path';
import { stringify } from 'querystring';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);
  const solutionPart2 = solverPart2(challenge);

  console.log([
    `The solutions for 2020's "Day 18: Operation Order" are:`,
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
 * the Advent of Code 2020's "Day 18: Operation Order" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n').map(processEntry);
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 18: Operation Order" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string} An array where each line is an entry of the challenge.
 */
export function processEntry(entry: string): (string | number)[] {
  const tokens = [];
  const operators = [ ')', '(', '+', '*' ];
  let currentNumber = '';

  for (const character of entry.replace(/\s/g, '')) {
    if (operators.includes(character)) {
      if (currentNumber !== '') {
        tokens.push(Number(currentNumber));
        currentNumber = '';
      }

      tokens.push(character);
    }
    else {
      currentNumber += character;
    }
  }

  if (currentNumber !== '') {
    tokens.push(Number(currentNumber));
  }
  
  return tokens;
}

/**
 * The function evaluates an expreession according to the rules described in
 * Part 1 of the challenges.
 * @param {string[]} tokens Tokenised entries of the challenge.
 * @param {number} startingIndex The index to begin evaluation at.
 * @returns {number} Number of valid entries.
 */
export function evaluate(tokens: (string | number)[]) {
  const stack = []
  const operators = [ '(', '+', '*' ];
  let prevNum: number = null;
  let result: number = null;

  while (tokens.length) {
    const token = tokens.shift()

    if (token === ')') {
      return result;
    }

    if (operators.includes(String(token))) {
      const operation = getOperation(stack.pop());

      if (token === '(') {
        if (operation === undefined) {
          result = evaluate(tokens);
        }
        else {
          result = operation(evaluate(tokens), result);
        }
      }
      else if (token === '+' || token === '*') {
        stack.push(token);
      }
    }
    else {
      const operation = getOperation(stack.pop());

      result = !!operation
        ? operation(result, Number(token))
        : Number(token);
    }
  }

  return result;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 18: Operation Order" challenge.
 * @param {string[]} expressions Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(expressions: (string | number)[][]) {
  return -1;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 18: Operation Order" challenge.
 * @param {string} expression Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(expression: (string | number)[][]) {
  return -1;
}

/**
 * This function returns a function that performs an operation on two numbers
 * that correspond to the operator provided.
 * @param {string} operator The operator that represents the operator to
 *     perform.
 * @returns {function} A function that performs the requested operation on
 *     two numebrs.
 */
export function getOperation(operator: string) {
  const multiply = (a: number, b: number) => a * b;
  const add = (a: number, b: number) => a + b;

  const operations = {
    '*': multiply,
    '+': add
  };
  
  return operations[operator];
}