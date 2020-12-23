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
  permutations: Permutations;
}

type Messages = string[];
type Permutations = {
  [permutation: string]: boolean;
};


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
        permutations: { [letter]: true }
      };
    }
    else {
      if (matched[2].match('|')) {
        const rule = matched[2]
          .split('|')
          .map((s) => s.trim().split(' ').map(Number));

        rules[ruleIndex] = { description: rule, permutations: {} };
      }
      else {
        const rule = [
          matched[2]
            .split(' ')
            .map(Number)
        ];

        rules[ruleIndex] = { description: rule, permutations: {} };
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
    Object.keys(rules[0].permutations).length === 0
  ) {
    const ruleIndices = Object.keys(rules).map(Number);

    for (const ruleIndex of ruleIndices) {
      const rule = rules[ruleIndex];
      const isUnsolved = Object.keys(rule.permutations).length === 0;
      
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
            let permutations = Object.keys(rules[item[0]].permutations);

            for (let i = 1; i < item.length; i++) {
              permutations = generatePermutations(
                permutations,
                Object.keys(rules[item[i]].permutations)
              )
            }

            for (const permutation of permutations) {
              allPermutations[permutation] = true;
            }
          }

          rule.permutations = allPermutations;
          solvedIndices.push(ruleIndex);
        }
      }
    }
  }

  const solutionLength = Object.keys(rules[0].permutations)[0].length;

  for (const permutation in rules[0].permutations) {
    if (permutation.length !== solutionLength) {
      throw Error('Inregular length found in permutations!!!');
    }
  }

  for (const message of messages) {
    if (
      message.length === solutionLength
      && rules[0].permutations[message]
    ) {
      numValidMessages++;
    }
  }

  return numValidMessages;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 19: Monster Messages" challenge. This solution depends on the fact,
 * that rule 8, 11 and 0 (in exactly this order) whose permutations are the
 * last three to be worked out in Part 1; as such, one only (and should)
 * work out permutations just before that point and then start performing
 * filtering based on length and searches afterwards to see if there are
 * possible soutions.
 * @param {Input} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: Input) {
  const { origins, rules, messages } = input;
  const solvedIndices = [ ...origins ];
  const numIndices = Object.keys(rules).length;
  let numValidMessages = 0;

  while (
    Object.keys(rules[0].permutations).length === 0
    && solvedIndices.length < numIndices - 3
  ) {
    const ruleIndices = Object.keys(rules).map(Number);

    for (const ruleIndex of ruleIndices) {
      const rule = rules[ruleIndex];
      const isUnsolved = Object.keys(rule.permutations).length === 0;
      
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
            let permutations = Object.keys(rules[item[0]].permutations);

            for (let i = 1; i < item.length; i++) {
              permutations = generatePermutations(
                permutations,
                Object.keys(rules[item[i]].permutations)
              )
            }

            for (const permutation of permutations) {
              allPermutations[permutation] = true;
            }
          }

          rule.permutations = allPermutations;
          solvedIndices.push(ruleIndex);
        }
      }
    }
  }

  // Rule 31 and 42's lengths are importnat in filtering. All their
  // permutations should be of the same length as in Part 1. Double check.
  const permutations31 = Object.keys(rules[31].permutations);
  const permutations42 = Object.keys(rules[42].permutations);

  for (const permutation of permutations31) {
    if (permutation.length !== permutations31[0].length) {
      throw Error('Inregular length found in permutations for Rule 31.');
    }
  }

  for (const permutation of permutations42) {
    if (permutation.length !== permutations42[0].length) {
      throw Error('Inregular length found in permutations for Rule 42.');
    }
  }

  // As both the loops in Rule 8 and Rule 11 contain the whole of the other rule
  // the length any permutation valid for 0 must be mutiple of the length of
  // the non-looping option (42 for Rule 8; and 42 31 for Rule 11). We begin
  // By filter base on these criteria.
  const messageLengths = messages.map((message) => message.length);
  const maxMessageLength = Math.max(...messageLengths);
  const l31 = permutations31[0].length;
  const l42 = permutations42[0].length;
  const minAllowedLength = l42 + l31 + l42;

  // Given that messages are not super long, we can work out all possible
  // message lengths that are valid first.
  const validMessageLengths = {};

  for (let i = 1; i < Math.floor(maxMessageLength / l42); i++) {
    for (let j = 1; j < Math.floor(maxMessageLength / (l42 + l31)); j++) {
      const l = l42 * i + (l42 + l31) * j;

      if (l >= minAllowedLength && l <= maxMessageLength) {
        validMessageLengths[l] = true;
      }
    }
  }

  for (const message of messages) {
    // It turns out that all lengths in the challenge input are valid. :/
    if (validMessageLengths[message.length]) {
      // The first length = l42 characters of a message must be a permutation
      // of Rule 42; the second l42 characters starting at index l42 must
      // also always be a permutation of Rule 42.
      // if (
      //   permutations42.includes(message.slice(0, l42))
      //   && permutations42.includes(message.slice(l42, l42 * 2))
      // ) 
      //   // Still only down to 437.
      // }
      //
      // OH! Because of the way Rule 11 loops, basically a valid message would
      // always be multiples of ONLY permutations of Rule 42, follow by
      // multiples of permutations of ONLY Rule 31, for example:
      // * P42 P42 P31
      // * P42 P42 P42 P31 P31
      // * P42 P42 P42 P42 P31 P31
      // * P42 P42 P42 P42 P42 P31 P31
      // * P42 P42 P42 P42 P42 P31 P31 P31
      const maxAllowedRule31 = Math.floor((message.length - l42) / (l42 + l31));
      for (let i = 1; i <= maxAllowedRule31; i++) {
        // Checking number of Rule 31 permutations backwards.
        const substringFront = message.slice(0, -i * l31);
        const substringBack = message.slice(-i * l31);
        let valid = true;

        for (let j = 0; j < i && valid; j++) {
          const section = substringBack.slice(j * l31, j * l31 + l31);

          valid = valid && permutations31.includes(section);
        }

        for (let k = 0; k < substringFront.length / l42 && valid; k++) {
          const section = substringFront.slice(k * l42, k * l42 + l42);

          valid = valid && permutations42.includes(section);
        }

        if (valid) {
          numValidMessages++;
          break;
        }
      }
    }
  }

  return numValidMessages;
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
