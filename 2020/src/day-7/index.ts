import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  // const solutionPart1 = solverPart1(challenge);
  // const solutionPart2 = solverPart2(challenge);

  console.log([
    `The solutions for 2020's "Day 7: Handy Haversacks" are:`,
    // `  * Part 1: ${green(solutionPart1)}`,
    // `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================
interface Bags {
  [name: string]: Bag
}

interface Bag {
  name: string;
  content: ContentBag[];
}

interface ContentBag {
  name: string;
  amount: number;
}


// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day 7: Handy Haversacks" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {Bags} An array where each line is an entry of the challenge.
 */
export function processFile(file: string): Bags {
  const bags = file.trim().split('\n').map(processEntry);
  const dict = {};
  
  for (const bag of bags) {
    dict[bag.name] = bag;
  }

  return dict;
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 7: Handy Haversacks" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {Bag} An array where each line is an entry of the challenge.
 */
export function processEntry(entry: string): Bag {
  const split = entry
    .replace(/\scontain/, '')
    .replace(',', '')
    .replace(/ bags*\.$/, '')
    .replace(' no other', '')
    .split(/ bags*/);

  const [ bagName, ...bagContent ] = split;
  const bag: Bag = {
    name: bagName,
    content: []
  };

  for (const item of bagContent) {
    if (item) {
      const [ _item, amount, name ] = item.match(/(\d+?)\s(.+)$/);

      bag.content.push({ name, amount: Number(amount) });
    }
  }

  return bag;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 7: Handy Haversacks" challenge.
 * @param {Bags} bags Entries of the challenge.
 * @param {string} myBagName The name of the bag to be carried in **at least one**
 *     other bag.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(bags: Bags, myBagName: string = 'shiny gold') {
  const allFound = {};

  for (const bagName in bags) {
    if (bagName === myBagName) {
      continue;
    }

    const rootBag = bags[bagName];
    const queue = [ rootBag ];
    const walked = [];
    let found = false;

    while (!found && queue.length > 0) {
      const bag = queue.shift();
      const { name: currentBagName } = bag;

      if (currentBagName === 'shiny gold' || allFound[currentBagName]) {
        found = true;
      }
      else {
        for (const { name: contentBagName } of bag.content) {
          queue.push(bags[contentBagName]);
        }
      }
    }

    if (found) {
      allFound[bagName] = true;
    }
  }

  return Object.keys(allFound).length;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 7: Handy Haversacks" challenge.
 * @param {any} input Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(input: string[][]) {
  return -1;
}

// /**
//  * This function walks through the `Bags` "network" recursively and finds
//  * all paths that lead to a "shiny gold" bag.
//  * @param {Bags} bags The bags object.
//  * @param {string} myBagName The bag name that indicates the end of a path.
//  * @param {string[]} walked Names of the bags that have been seen along a
//  *     path.
//  * @param {object} allFound An object of all bags that have been found
//  *     leading to a bag whose name is `myBagName`.
//  * @return {string[]} Names of the bags that have been seen along a
//  *     path, if myBagName was found, or an empty array otherwise.
//  */
// export function solverPart1(
//   bags: Bags,
//   myBagName: string,
//   walked: string[] = [],
//   allFound: object = {}
// ) {
//   for (const bagName in bags) {
//     const bag = bags[bagName];

//     if (bagName === myBagName || allFound[bagName]) {
//       for (const name of walked) {
//         allFound[name] = true;
//       }
//     }
//     else {
//       walked.push(bagName);

//       for (const contentBag of bag.content) {
//         solverPart1(bags, myBagName, [ ...walked ], allFound);
//       }
//     }
//   }

//   return Object.keys(allFound).length;
// }