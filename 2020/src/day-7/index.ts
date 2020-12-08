import * as fs from 'fs';
import * as path from 'path';

import { green, logDuration } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);
  const solutionPart2 = logDuration(
    'solverPart2',
    () => solverPart2(challenge)
  );
  const solutionPart2Attempt2 = logDuration(
    'solverPart2Attempt2',
    () => solverPart2Attempt2(challenge)
  );

  console.log([
    `The solutions for 2020's "Day 7: Handy Haversacks" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`,
    `  * Part 2 (Attempt 2): ${green(solutionPart2Attempt2)}`
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
 * @returns {Bags} An object containing deatils for each type of bag.
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
 * @returns {Bag} An object representing the properties of a bag.
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
 * @param {string} myBagName The name of the bag to be carried in
 *     **at least one** other bag.
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
 * @param {Bags} bags Entries of the challenge.
 * @param {string} myBagName The name of the bag to be carried in
 *     **at least one** other bag.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(bags: Bags, myBagName: string = 'shiny gold') {
  const rootBag = bags[myBagName];
  const queue = [ rootBag ];
  let numBagsContained = 0;

  while (queue.length > 0) {
    const currentBag = queue.shift();

    if (!currentBag.content) {
      console.log(currentBag);
    }

    for (const contentBag of currentBag.content) {
      const { name, amount } = contentBag;

      numBagsContained += amount;

      for (let i = 0; i < amount; i++) {
        queue.push(bags[name]);
      }
    }
  }

  return numBagsContained;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 7: Handy Haversacks" challenge.
 * @param {Bags} bags Entries of the challenge.
 * @param {string} myBagName The name of the bag to be carried in
 *     **at least one** other bag.
 * @returns {number} Number of valid entries.
 */
export function solverPart2Attempt2(
  bags: Bags,
  rootBagName: string = 'shiny gold',
  isRoot: boolean = true
) {
  const { content: childBags } = bags[rootBagName];
  let total = isRoot ? 0 : 1;
  
  if (!childBags.length) {
    return total;
  }

  for (const childBag of childBags) {
    const { name: childBagName, amount: childBagAmount } = childBag;
    
    total += childBagAmount * solverPart2Attempt2(bags, childBagName, false);
  }

  return total;
}