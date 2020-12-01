import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


export function solvePart1(input: number[], total: number = 2020) {
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

if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = challengeFile.trim().split('\n').map(Number);
  const solution = solvePart1(challenge);

  console.log([
    `The solutions for 2020's "Day 1: Report Repair" are:`,
    `  * Part 1: ${green(solution)}`
  ].join('\n'));
}