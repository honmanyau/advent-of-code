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
    `The solutions for 2020's "Day 19: Monster Messages" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================
interface Input {
  origins: number[];
  rules: Rules;
  messages: Messages;
}

interface Rules {
  [ruleIndex: number]: Rule;
}

interface Rule {
  rule: (string | number | number[])[];
  permutations: string[];
}

type Messages = string[];


// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day 19: Monster Messages" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string): Input {
  const [ unparsedRules, unparsedMessages ] = file
    .trim()
    .split('\n\n');
  const origins = [];
  const rules: Rules = {};
  const messages: Messages = unparsedMessages.split('\n');

  for (const unparsedRule of unparsedRules.split('\n')) {
    const matched = unparsedRule.match(/^(\d+?): (.+)$/);
    const ruleIndex = Number(matched[1]);

    if (matched[2] === '"a"' || matched[2] === '"b"') {
      const letter = matched[2].replace(/\"/g, '')

      origins.push(ruleIndex);
      rules[ruleIndex] = {
        rule: [ letter ],
        permutations: [ letter ]
      };
    }
    else {
      if (matched[2].match('|')) {
        const rule = matched[2]
          .split('|')
          .map((s) => s.trim().split(' ').map(Number));

        rules[ruleIndex] = { rule, permutations: [] };
      }
      else {
        const rule = matched[2]
          .split(' ')
          .map(Number);

        rules[ruleIndex] = { rule, permutations: [] };
      }
    }
  }

  return { origins, rules, messages };
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 19: Monster Messages" challenge.
 * @param {Input} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(input: Input) {
  return -1;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 19: Monster Messages" challenge.
 * @param {Input} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: Input) {
  return -1;
}