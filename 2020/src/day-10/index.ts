import { assert } from 'console';
import * as fs from 'fs';
import * as path from 'path';

import { green, logDuration } from '../utilities';


if (process.env.SOLVE && process.env.SOLVE.toLowerCase() === 'true') {
  const challengePathname = path.resolve(__dirname, './input.txt');
  const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
  const challenge = processFile(challengeFile);
  const solutionPart1 = solverPart1(challenge);
  const solutionPart2 = logDuration(
    'solutionPart2',
    () => solverPart2(calcDifferences(challenge))
  );

  console.log([
    `The solutions for 2020's "Day 10: Adapter Array" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
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
 * This function processes an input file of the Advent of Code 2020's
 * "Day 10: Adapter Array" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string) {
  return file.trim().split('\n').map(Number);
}

/**
 * This function sorts a list of adapter joltages, appends the voltage of the
 * device, and returns the differences between them.
 * @param {number[]} adapters A list of adapter joltages.
 * @returns A list of joltage differences.
 */
export function calcDifferences(adapters: number[]) {
  const allJoltagesSorted = [ ...adapters ].sort((a, b) => a - b);

  allJoltagesSorted.push(allJoltagesSorted[allJoltagesSorted.length - 1] + 3);

  const differences = allJoltagesSorted.map((joltage, i) => {
    const prevJoltage = allJoltagesSorted[i - 1] || 0;
    const difference = joltage - prevJoltage;

    if (difference <= 0 || difference >= 4) {
      throw Error('Invalid solution found!');
    }

    return joltage - prevJoltage;
  });

  return differences;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 10: Adapter Array" challenge.
 * @param {number[]} adapters Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(adapters: number[]) {
  const differences = calcDifferences(adapters);
  let numOnes = 0;
  let numThrees = 0;

  for (const difference of differences) {
    if (difference === 1) {
      numOnes += 1;
    }

    if (difference === 3) {
      numThrees += 1;
    }
  }

  return numOnes * numThrees;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 10: Adapter Array" challenge.
 * @param {number[]} differences An array of joltage diffrences derived from a
 *     sorted (ascending) list of adapter joltages.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(differences: number[]) {
  // The problem definitely can't be solved in a reasonable amount
  // of time by brute force. Given that the actual numbers do not matter,
  // and that the first part is a strong hint to that, the problem probably
  // requires division into more digestable parts. Brain dump follows.
  //
  // 1. Consider the simple case of [ (0), 3, 6, 9, (12) ], whose difference is
  //    represented as [ 3, 3, 3, 3 ]. It is clear that there is only one
  //    solution in this case because removing any one number (hence added the
  //    original differences before and after the given number), will result in
  //    a new difference of 6.
  //
  // 2. Consider then the case of [ (0), 1, 4, 7, (10) ], whose differences are
  //    [ 1, 3, 3, 3 ]. Again, none of the numbers can be removed for the same
  //    same reason as **POINT 1**.
  //
  // 3. What about [ (0), 1, 3, 6, (9) ] and [ 1, 2, 3, 3 ]? In this case the
  //    first number can be removed, which will result in a new difference of
  //    [ 3, 3, 3 ]. It seems that [ 1, 2, 3 ] is a subsetaunce that can be
  //    reduced and one could define boundaries base on where 3's occur?
  //
  // 4. Double check with [ (0), 3, 4, 6, 9, (12) ] and [ 3, 1, 2, 3, 3 ]. Using
  //    the reasoning in **POINT 3**, one could split the differences into
  //    [ 3 ], [ 1, 2 ], [ 3 ] [ 3 ]. There is exactly one way to reduce
  //    [ 1, 2 ] to [ 3 ], so the number of possible solutions is
  //    1 * 2 * 1 * 1 = 2. This seems okay so far.
  //
  // 5. Let's try [ (0), 2, 3, 4, 6, 9, (12) ] and [ 2, 1, 1, 2, 3, 3 ],
  //    which has 5 solutions. The subsequences are [ 2, 1, 1, 2 ], [ 3 ]
  //    and [ 3 ]. The reducible subsequence [ 2, 1, 1, 2 ] already hurts
  //    my head, uh, I mean it has slightly more work involved (thank goodness
  //    it's not difficult to see 5 solutions in the original array). The
  //    "first-order" reductions are:
  //      * [ 3, 1, 2 ], which corresponds to [ (0), 3, 4, 6 ]
  //      * [ 2, 1, 3 ], which corresponds to [ (0), 2, 3, 6 ]
  //      * [ 2, 2, 2 ], which corresponds to [ (0), 2, 4, 6 ]
  //
  //    The first two solutions can be further reduced:
  //      * [ 3, 1, 2 ] => [ 3 ], [ 1, 2 ] => [ 3 ], [ 3 ] (Irreducible)
  //      * [ 2, 1, 3 ] => [ 2, 1 ], [ 3 ] => [ 3 ], [ 3 ] (Equivalent)
  //
  //    Therefore exactly five solutions because there are five unique
  //    (in terms of adapter joltages) to represent joltages.
  //
  // 6. We need more examples. Let's try [ (0), 2, 3, 4, 5, 6, 9, (12) ], whose
  //    differences are [ 2, 1, 1, 1, 1, 3, 3 ], and hope that we can find 11
  //    solutions using the logic above.
  //
  //    Chopping it off at 3's (1 solution):
  //      * [ 2, 1, 1, 1, 1 ], [ 3 ] and [ 3 ] <--> [ (0), 2, 3, 4, 5, 6 ],
  //        [ 6, 9 ] and [ 9, 12 ].
  //
  //    "First-order" reduction (4 unique solutions):
  //      * [ 2, 1, 1, 1, 1 ] => [ 3, 1, 1, 1 ] <--> [ (0), 3, 4, 5, 6 ]
  //      * [ 2, 1, 1, 1, 1 ] => [ 2, 2, 1, 1 ] <--> [ (0), 2, 4, 5, 6 ]
  //      * [ 2, 1, 1, 1, 1 ] => [ 2, 1, 2, 1 ] <--> [ (0), 2, 3, 5, 6 ]
  //      * [ 2, 1, 1, 1, 1 ] => [ 2, 1, 1, 2 ] <--> [ (0), 2, 3, 4, 6 ]
  //
  //    "Second-order" reduction (5 unique solutions):
  //      * [ 3, 1, 1, 1 ] => ... => [ 3 ], [ 2, 1 ] <--> [ (0), 3 ] and
  //        [ 3, 5, 6 ]
  //      * [ 3, 1, 1, 1 ] => ... => [ 3 ], [ 1, 2 ] <--> [ (0), 3 ] and
  //        [ 3, 4, 6 ]
  //      * [ 2, 2, 1, 1 ] => ... => [ 2, 2, 2 ] <--> [ (0), 2, 4, 6 ]
  //        (Irreducible)
  //      * [ 2, 2, 1, 1 ] => ... => [ 2 ], [ 3 ], [ 1 ] <--> [ (0), 2 ],
  //        [ 2, 5 ] and [ 5, 6 ].
  //      * [ 2, 1, 2, 1 ] => ... => [ 3 ], [ 2, 1 ] <--> [ (0), 3 ] and
  //        [ 3, 5, 6 ]
  //      * [ 2, 1, 2, 1 ] => ... => [ 2, 1 ], [ 3 ] <--> [ (0), 2, 3 ] and
  //        [ 3, 6 ]
  //      * [ 2, 1, 2, 1 ] => ... => [ 2 ], [ 3 ], [ 1 ] <--> [ (0), 2 ] and
  //        [ 2, 5 ] and [ 5, 6 ] (Irreducible)
  //      * [ 2, 1, 1, 2 ] => ... => [ 2, 2, 2 ] <--> [ (0), 2, 4, 6 ]
  //        (Irreducible)
  //      * [ 2, 1, 1, 2 ] => ... => [ 3 ], [ 1, 2 ] <--> [ (0), 3 ] and
  //        [ 3, 4, 6 ]
  //      * [ 2, 1, 1, 2 ] => ... => [ 2, 1 ], [ 3 ] <--> [ (0), 2, 3 ] and
  //        [ 3, 6 ]
  //
  //    "Third-order" reduction (1 unique solution):
  //      * [ 3 ], [ 2, 1 ] => ... => [ 3 ], [ 3 ] <--> [ (0), 3 ] and [ 3, 6 ]
  //      * [ 3 ], [ 1, 2 ] => ... => [ 3 ], [ 3 ] <--> [ (0), 3 ] and [ 3, 6 ]
  //      * [ 2, 1 ], [ 3 ] => ... => [ 3 ], [ 3 ] <--> [ (0), 3 ] and [ 3, 6 ]
  //
  //    It seems okay, too! So far it's most likely that the number of
  //    solutions is the totoal number of unique solutions at each level of
  //    reduction. This looks like some sort of recursion, and can probably
  //    be optimised by storing solved subsequences in memory. Am happy with
  //    that but sleepy, will continue tomorrow. ._.
  //
  // Continuing from a couple of days ago, it actually looks like one can already
  // solve this problem.
  let solutions = 1;

  if (false) {
    const splits = splitDifferences(differences);

    for (const split of splits) {
      const splitSolution = (split.includes(3))
        ? 1
        : solverPart2(split);

      solutions *= splitSolution;
    }
  }
  else {
    let currentSequences = [ differences ];
    let irreducible = false;

    // This is not as recursive as I would like and likely not a very smart
    // way to solve the problem because the only "optimisation" of the
    // seeminly impossible to solve problem is the initial split: ideally one
    // would do the part below recursively with solverPart2(), such that
    // 3's that appear during reduction would go get split in the previous
    // if statement.
    //
    // Have been tired the last few days and is incredibly obtuse at the
    // moment (well, more so than usual), and I'm already behind for a couple
    // of days. It is worth noting that without the initial split, the default
    // amount of memory for Node.js is insufficient for solving the problem; and
    // no output was observed after half a minute when memory is increased.
    // Since the current implementation takes a surprisingly little
    // amount of time (< 1 ms), meaning that the original input must already
    // be quite segmented (by 3's), I'm going to leave it as is for now.

    while (!irreducible) {
      currentSequences = currentSequences
        .map(generateSubsequences)
        .reduce((acc, val) => acc.concat(val), [])
        .filter((subsequence) => subsequence.length)

      const uniqueSequences = new Set(currentSequences.map(String));

      solutions += uniqueSequences.size;
      irreducible = !uniqueSequences.size;
    }
  }

  return solutions;
}

/**
 * This functions splits a sequence into subsequences by removing differences
 * of 3.
 * @param {number[]} differences An array of joltage differences.
 * @returns {number[][] | []} An array of subsequences without the number 3.
 */
export function splitDifferences(differences: number[]) {
  const subsequences = [];
  let subsequence = [];
  let threes = [];

  for (let i = 0; i < differences.length; i++) {
    const difference = differences[i];
    
    if (difference === 3) {
      if (subsequence.length) {
        subsequences.push(subsequence);
      }

      threes.push(3);

      subsequence = [];
    }
    else {
      if (threes.length) {
        subsequences.push(threes);
      }

      subsequence.push(difference);

      threes = [];
    }
  }

  if (subsequence.length) {
    subsequences.push(subsequence);
  }

  if (threes.length) {
    subsequences.push(threes);
  }

  return subsequences;
}

/**
 * This function generates all valid subsequences (no diffence > 3) by
 * combining pairs of elements.
 * @param {number[]} differences An array of joltage differences.
 * @returns {number[][] | []} An array of subsequences.
 */
export function generateSubsequences(differences: number[]) {
  const subsequences = [];

  if (differences.length < 2) {
    return [];
  }

  for (let i = 1; i < differences.length; i++) {
    const sum = differences[i] + differences[i - 1];

    if (sum <= 3) {
      subsequences.push([
        ...differences.slice(0, i - 1),
        sum,
        ...differences.slice(i + 1, differences.length)
      ]);
    }
  }

  return subsequences;
}

/**
 * This function checks whether or not a sequence is irreducible.
 * @param {number[]} differences An array of joltage differences.
 * @returns {boolean} Whether or not a sequence *is irreducible*.
 */
export function checkIrreducibility(differences: number[]) {
  return generateSubsequences(differences).length === 0;
}