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
  description: (string | number[])[];
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
        description: [ letter ],
        permutations: [ letter ]
      };
    }
    else {
      if (matched[2].match('|')) {
        const rule = matched[2]
          .split('|')
          .map((s) => s.trim().split(' ').map(Number));

        rules[ruleIndex] = { description: rule, permutations: [] };
      }
      else {
        const rule = [
          matched[2]
            .split(' ')
            .map(Number)
        ];

        rules[ruleIndex] = { description: rule, permutations: [] };
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
  const { origins, rules, messages } = input;
  const solvedIndices = [ ...origins ];
  const numIndices = Object.keys(rules).length;
  let numValidMessages = 0;

  while (
    rules[0].permutations.length === 0 
    // && solvedIndices.length < numIndices - 1
  ) {
    const ruleIndices = Object.keys(rules).map(Number);

    for (const ruleIndex of ruleIndices) {
      const rule = rules[ruleIndex];
      const isUnsolved = rule.permutations.length === 0;
      
      if (isUnsolved) {
        const canBeSolved = rule.description.reduce((acc, indices) => {
          const indicesFound = (indices as number[])
            .reduce((innerAcc, index) => {
              return innerAcc && solvedIndices.includes(index);
            }, true);

          return acc && indicesFound
        }, true);
        
        if (canBeSolved) {
          const allPermutations = {};

          for (const item of rule.description) {
            let permutations = [ ...rules[item[0]].permutations ];

            for (let i = 1; i < item.length; i++) {
              permutations = generatePermutations(
                permutations,
                rules[item[i]].permutations
              )
            }

            for (const permutation of permutations) {
              allPermutations[permutation] = true;
            }
          }

          rule.permutations = Object.keys(allPermutations);
          solvedIndices.push(ruleIndex);
        }
      }
    }
  }

  // With the actual input we run out of memory at this point because there are
  const solutionLength = rules[0].permutations[0].length;

  for (const message of messages) {
    if (
      message.length === solutionLength
      && rules[0].permutations.includes(message)
    ) {
      numValidMessages++;
    }
  }

  return numValidMessages;
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

/**
 * This function generate all string permutations between two arrays of strings
 * such that the first part of the string always comes from the first of the two
 * arrays.
 * @param {string[]} arr One of the two arrays.
 * @param {string[]} brr The other one of the two arrays.
 * @return {string[]} The resultant permutations.
 */
export function generatePermutations(arr: string[], brr: string[]): string[] {
  const permutations = {};

  for (const a of arr) {
    for (const b of brr) {
      const combined = a + b;

      permutations[combined] = true;
    }
  }

  return Object.keys(permutations);
}