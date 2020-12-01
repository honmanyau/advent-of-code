import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


export function solverPart1(input: number[], total: number = 2020) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (
        i !== j
        && (input[i] + input[j]) === total
      ) {
        return input[i] * input[j];
      }
    }
  }

  throw Error('There are no pairs that sum up to 2020 in the input!');
}

export function solverPart2(input: number[], total: number = 2020) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      for (let k = 0; k < input.length; k++) {
        if (
          i !== j
          && i !== k
          && j !== k
          && (input[i] + input[j] + input[k]) === total
        ) {
          return input[i] * input[j] * input[k];
        }
      }
    }
  }

  throw Error('There are no three numbers that sum up to 2020 in the input!');
}

if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = challengeFile.trim().split('\n').map(Number);
  const solutionPart1 = solverPart1(challenge);
  const solutionPart2 = solverPart2(challenge);

  console.log([
    `The solutions for 2020's "Day 1: Report Repair" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));

  
}