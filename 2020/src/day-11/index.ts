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
    `The solutions for 2020's "Day 11: Seating System" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================
type Unit = 'L' | '#' | '.';
type Layout = Unit[][];



// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processLine` function process an input file of
 * the Advent of Code 2020's "Day 11: Seating System" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {Layout} An array where each line is an entry of the challenge.
 */
export function processFile(file: string): Layout {
  return file.trim().split('\n').map(processLine);
}

/**
 * This function processes each entry of pre-processed input.
 * the Advent of Code 2020's "Day 11: Seating System" challenge.
 * @param {string} file A challenge file read in as a string.
 * @returns {Unit[]} An array where each line is an entry of the challenge.
 */
export function processLine(line: string) {
  return line.split('') as Unit[];
}

/**
 * This function evolves a given `Layout` according to the following rules:
 *   * If a seat is empty (L) and there are no occupied seats adjacent to it,
 *     the seat becomes occupied.
 *   * If a seat is occupied (#) and four or more seats adjacent to it are
 *     also occupied, the seat becomes empty.
 *   * Otherwise, the seat's state does not change.
 * @param {Layout} layout A `Layout` that describes seat occupancy in a waiting
 *     area.
 * @param {number} interations The number of iterations that the layout will
 *     evolve.
 * @returns {Layout} An evolved layout.
 */
export function evolve(layout: Layout, iterations: number = 1): Layout {
  const lengthY = layout.length;
  const lengthX = layout[0].length;
  const neighbourOffsets = [
    [ -1, -1 ], [ -1, 0 ], [ -1, 1 ],
    [  0, -1 ],            [  0, 1 ],
    [  1, -1 ], [  1, 0 ], [  1, 1 ]
  ];
  const neighboursLookup = layout.map((row, y) => {
    return row.map((_unit, x) => {
      // Oops, I just started with PBC. Maybe useful later.
      // return neighbourOffsets.map(([ dy, dx ]) => [
      //   ((y + dy) % maxY + maxY) % maxY,
      //   ((x + dx) % maxX + maxX) % maxX
      // ]);
      return neighbourOffsets.reduce((acc, [ dy, dx ]) => {
        const nextY = y + dy;
        const nextX = x + dx;
        const withinY = (layout[nextY] !== undefined);
        const withinBounds = withinY && (layout[nextY][nextX] !== undefined);

        if (withinBounds) {
          acc.push([
            nextY % lengthY,
            nextX % lengthX
          ]);
        }

        return acc;
      }, [] as number[][]);
    });
  });

  let newLayout = JSON.parse(JSON.stringify(layout));

  for (let i = 0; i < iterations; i++) {
    newLayout = newLayout.map((row, y) => {
      return row.map((unit, x) => {
        const neighbours = neighboursLookup[y][x];
        const unitCounters = {
          '.': 0,
          'L': 0,
          '#': 0
        };
  
        neighbours.forEach(([ neighbourY, neighbourX ]) => {
          const neighbourUnit = newLayout[neighbourY][neighbourX];

          unitCounters[neighbourUnit] += 1;
        });

        if (unit === '#' && unitCounters['#'] >= 4) {
          return 'L';
        }
        else if (unit === 'L' && unitCounters['#'] === 0) {
          return '#';
        }
        else {
          return unit;
        }
      });
    });
  }

  return newLayout;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 11: Seating System" challenge.
 * @param {Layout} layout Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(layout: Layout) {
  let currentLayout = JSON.parse(JSON.stringify(layout));
  let stabilised = false;

  while (!stabilised) {
    const nextLayout = evolve(currentLayout);

    stabilised = currentLayout.toString() === nextLayout.toString();
    currentLayout = nextLayout;
  }

  return currentLayout.toString().replace(/[L\.\,]/g, '').length;
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 11: Seating System" challenge.
 * @param {Layout} layout Entries of the challenge.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(layout: Layout) {
  return layout;
}