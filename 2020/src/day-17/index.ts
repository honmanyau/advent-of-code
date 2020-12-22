import { count } from 'console';
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
    `The solutions for 2020's "Day 17: Conway Cubes" are:`,
    `  * Part 1: ${green(solutionPart1)}`,
    `  * Part 2: ${green(solutionPart2)}`
  ].join('\n'));
}


// ================
// == Interfaces ==
// ================
export interface Cube {
  [z: number] : {
    [y: number]: {
      [x: number]: Node;
    }
  }
}

export type Node = '.' | '#';

// ===============
// == Functions ==
// ===============
/**
 * This function uses the `processEntry` function process an input file of
 * the Advent of Code 2020's "Day 17: Conway Cubes" challenge.
 * @param {Cube} file A challenge file read in as a string.
 * @returns {string[]} An array where each line is an entry of the challenge.
 */
export function processFile(file: string): Cube {
  const cube: Cube = {};

  cube[0] = {};

  file
    .trim()
    .split('\n')
    .forEach((line, y) => {
      if (!cube[0][y]) {
        cube[0][y] = {};
      }

      line.split('').forEach((node, x) => {
        cube[0][y][x] = node as Node;
      });
    });

  return cube;
}

/**
 * The solver function for Part 1 of the Advent of Code 2020's
 * "Day 17: Conway Cubes" challenge.
 * @param {Cube} cube A Conway Cube.
 * @returns {number} Number of valid entries.
 */
export function solverPart1(cube: Cube) {
  return countActiveNodes(evolve(cube, 6));
}

/**
 * The solver function for Part 2 of the Advent of Code 2020's
 * "Day 17: Conway Cubes" challenge.
 * @param {Cube} cube A Conway Cube.
 * @returns {number} Number of valid entries.
 */
export function solverPart2(cube: Cube) {
  return -1;
}

/**
 * This function evolves a Conway Cube for the given number of generations.
 * @param {Cube} cube A Conway Cube.
 * @param {number} generations The number of generations to evolve for.
 * @returns {Cube} A Conway Cube.
 */
export function evolve(cube: Cube, generations: number) {
  let newCube = JSON.parse(JSON.stringify(cube));;

  for (let generation = 0; generation < generations; generation++) {
    const zs = Object.keys(newCube).map(Number).sort((a, b) => a - b);
    const ys = Object.keys(newCube[zs[0]]).map(Number).sort((a, b) => a - b);
    const xs = Object.keys(newCube[zs[0]][ys[0]]).map(Number).sort((a, b) => a - b);
    let zActiveMin: number;
    let zActiveMax: number;
    let yActiveMin: number;
    let yActiveMax: number;
    let xActiveMin: number;
    let xActiveMax: number;
    let nextCube = JSON.parse(JSON.stringify(newCube));

    for (let z = zs[0] - 1; z <= zs.slice(-1)[0] + 1; z++) {
      for (let y = ys[0] - 1; y <= ys.slice(-1)[0] + 1; y++) {
        for (let x = xs[0] - 1; x <= xs.slice(-1)[0] + 1; x++) {
          const neighbours = getNeighbours(z, y, x);
          const nodeMissing = newCube[z] === undefined
              || newCube[z][y] === undefined
              || newCube[z][y][x] === undefined;
          let numActive = 0;
  
          for (const neighbour of neighbours) {
            const [ zn, yn, xn ] = neighbour;
            const neighbourexists = newCube[zn] !== undefined
              && newCube[zn][yn] !== undefined
              && newCube[zn][yn][xn] !== undefined;
  
            if (neighbourexists) {
              if (newCube[zn][yn][xn] === '#') {
                numActive++;
              }
            }
          }

          if (nodeMissing) {
            nextCube[z] = nextCube[z] || {};
            nextCube[z][y] = nextCube[z][y] || {};
            nextCube[z][y][x] = '.';
          }

          if (nodeMissing || newCube[z][y][x] === '.') {
            if (numActive === 3) {
              nextCube[z][y][x] = '#';

              zActiveMin = (zActiveMin === undefined || z < zActiveMin)
                ? z
                : zActiveMin;
              yActiveMin = (yActiveMin === undefined || y < yActiveMin)
                ? y
                : yActiveMin;
              xActiveMin = (xActiveMin === undefined || x < xActiveMin)
                ? x
                : xActiveMin;
              zActiveMax = (zActiveMax === undefined || z > zActiveMax)
                ? z
                : zActiveMax;
              yActiveMax = (yActiveMax === undefined || y > yActiveMax)
                ? y
                : yActiveMax;
              xActiveMax = (xActiveMax === undefined || x > xActiveMax)
                ? x
                : xActiveMax;
            }
          }
          else {
            if (numActive !== 2 && numActive !== 3) {
              nextCube[z][y][x] = '.';
            }
            else {
              zActiveMin = (zActiveMin === undefined || z < zActiveMin)
                ? z
                : zActiveMin;
              yActiveMin = (yActiveMin === undefined || y < yActiveMin)
                ? y
                : yActiveMin;
              xActiveMin = (xActiveMin === undefined || x < xActiveMin)
                ? x
                : xActiveMin;
              zActiveMax = (zActiveMax === undefined || z > zActiveMax)
                ? z
                : zActiveMax;
              yActiveMax = (yActiveMax === undefined || y > yActiveMax)
                ? y
                : yActiveMax;
              xActiveMax = (xActiveMax === undefined || x > xActiveMax)
                ? x
                : xActiveMax;
            }
          }
        }
      }
    }

    // Clean up empty space.
    for (const zKey in nextCube) {
      const z = Number(zKey);

      if (z < zActiveMin || z > zActiveMax) {
        delete nextCube[z];
        continue;
      }

      for (const yKey in nextCube[zKey]) {
        const y = Number(yKey);

        if (y < yActiveMin || y > yActiveMax) {
          delete nextCube[z][y];
          continue
        }

        for (const xKey in nextCube[zKey][yKey]) {
          const x = Number(xKey);

          if (x < xActiveMin || x > xActiveMax) {
            delete nextCube[z][y][x];
            continue;
          }
        }
      }
    }

    newCube = nextCube;
  }

  return newCube;
}

/**
 * This function generates the coordinates of all the neighbours of a given
 * point in a Conway Cube.
 * @param {number} z The z coordinate of a point.
 * @param {number} y The y coordinate of a point.
 * @param {number} x The x coordinate of a point.
 * @returns {[ number, number, number ][]} The coordinates of the neighbours.
 */
export function getNeighbours(z, y, x): [ number, number, number ][] {
  const neighbours = [];

  for (let i = z - 1; i <= z + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = x - 1; k <= x + 1; k++) {
        if (!(i === z && j === y && k === x)) {
          neighbours.push([ i, j, k ]);
        }
      }
    }
  }

  return neighbours;
}

/**
 * THis function counts the number of active nodes in a cube.
 * @param {Cube} cube A Conway Cube
 * @returns {number} The number of active nodes.
 */
export function countActiveNodes(cube: Cube): number {
  let count = 0;

  for (const z of Object.keys(cube)) {
    for (const y of Object.keys(cube[z])) {
      for (const x of Object.keys(cube[z][y])) {
        if (cube[z][y][x] === '#') {
          count++;
        }
      }
    }
  }

  return count;
}