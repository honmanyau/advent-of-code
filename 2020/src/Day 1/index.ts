import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


export function solve(input: number[]) {
  for (let i = 0; i < input.length; i++) {
    const currentValue = input[i];
    const difference = 2020 - currentValue;
    const indexOfDifference = input.indexOf(difference);

    if (
      indexOfDifference !== -1
      && indexOfDifference !== i
    ) {
      return currentValue * difference;
    }
  }

  throw Error('There are no pairs that sum up to 2020 in the input!');
}

if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = challengeFile.trim().split('\n').map(Number);
  const solution = solve(challenge);

  console.log([
    `The solutions for 2020's "Day 1: Report Repair" are:`,
    `  * Part 1: ${green(solution)}`
  ].join('\n'));
}