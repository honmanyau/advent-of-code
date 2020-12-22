import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  Cube,
  evolve,
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 17: Conway Cubes (Part 1)', () => {
  describe(`evolve()`, () => {
    it([
      `should produce the following output after 1 cycle:`,
      `           z=-1`,
      `           #..`,
      `           ..#`,
      `           .#.`,
      `           `,
      `           z=0`,
      `           #.#`,
      `           .##`,
      `           .#.`,
      `           `,
      `           z=1`,
      `           #..`,
      `           ..#`,
      `           .#.`
    ].join('\n'), () => {
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const solution = converCubeToString(evolve(exampleCopy, 1));
      const expected = [
        [
          `#..`,
          `..#`,
          `.#.`
        ],
        [
          `#.#`,
          `.##`,
          `.#.`,          
        ],
        [
          `#..`,
          `..#`,
          `.#.`          
        ]
      ];

      assert.deepStrictEqual(solution, expected);
    });

    it([
      `should produce the following output after 2 cycles:`,
      `           z=-2`,
      `           .....`,
      `           .....`,
      `           ..#..`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=-1`,
      `           ..#..`,
      `           .#..#`,
      `           ....#`,
      `           .#...`,
      `           .....`,
      `           `,
      `           z=0`,
      `           ##...`,
      `           ##...`,
      `           #....`,
      `           ....#`,
      `           .###.`,
      `           `,
      `           z=1`,
      `           ..#..`,
      `           .#..#`,
      `           ....#`,
      `           .#...`,
      `           .....`,
      `           `,
      `           z=2`,
      `           .....`,
      `           .....`,
      `           ..#..`,
      `           .....`,
      `           .....`
    ].join('\n'), () => {
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const solution = converCubeToString(evolve(exampleCopy, 2));
      const expected = [
        [
          `.....`,
          `.....`,
          `..#..`,
          `.....`,
          `.....`
        ],
        [
          `..#..`,
          `.#..#`,
          `....#`,
          `.#...`,
          `.....`
        ],
        [
          `##...`,
          `##...`,
          `#....`,
          `....#`,
          `.###.`
        ],
        [
          `..#..`,
          `.#..#`,
          `....#`,
          `.#...`,
          `.....`
        ],
        [
          `.....`,
          `.....`,
          `..#..`,
          `.....`,
          `.....`
        ]
      ];

      assert.deepStrictEqual(solution, expected);
    });

    it([
      `should produce the following output after 3 cycle:`,
      `           z=-2`,
      `           .......`,
      `           .......`,
      `           ..##...`,
      `           ..###..`,
      `           .......`,
      `           .......`,
      `           .......`,
      `           `,
      `           z=-1`,
      `           ..#....`,
      `           ...#...`,
      `           #......`,
      `           .....##`,
      `           .#...#.`,
      `           ..#.#..`,
      `           ...#...`,
      `           `,
      `           z=0`,
      `           ...#...`,
      `           .......`,
      `           #......`,
      `           .......`,
      `           .....##`,
      `           .##.#..`,
      `           ...#...`,
      `           `,
      `           z=1`,
      `           ..#....`,
      `           ...#...`,
      `           #......`,
      `           .....##`,
      `           .#...#.`,
      `           ..#.#..`,
      `           ...#...`,
      `           `,
      `           z=2`,
      `           .......`,
      `           .......`,
      `           ..##...`,
      `           ..###..`,
      `           .......`,
      `           .......`,
      `           .......`
    ].join('\n'), () => {
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const solution = converCubeToString(evolve(exampleCopy, 3));
      const expected = [
        [
          `.......`,
          `.......`,
          `..##...`,
          `..###..`,
          `.......`,
          `.......`,
          `.......`
        ],
        [
          `..#....`,
          `...#...`,
          `#......`,
          `.....##`,
          `.#...#.`,
          `..#.#..`,
          `...#...`
        ],
        [
          `...#...`,
          `.......`,
          `#......`,
          `.......`,
          `.....##`,
          `.##.#..`,
          `...#...`
        ],
        [
          `..#....`,
          `...#...`,
          `#......`,
          `.....##`,
          `.#...#.`,
          `..#.#..`,
          `...#...`
        ],
        [
          `.......`,
          `.......`,
          `..##...`,
          `..###..`,
          `.......`,
          `.......`,
          `.......`
        ],
      ];
  
      assert.deepStrictEqual(solution, expected);
    });
  });
  
  describe(`sovlerPart1()`, () => {
    it([
      `should do something.`
    ].join(''), () => {
      const solution = solverPart1(example);
    });
  });
});

describe('Day 17: Conway Cubes (Part 2)', () => {
  describe('solverPart2()', () => {
    // Given example.
    it([
      `should do something.`
    ].join(''), () => {
      const solution = solverPart2(example);
    });
  });
});

// ===============
// == Functions ==
// ===============
/**
 * This function converts a Cube into an array of strings for easier testing
 * that doesn't involve indices.
 * @param {Cube} cube A Conway Cube.
 * @returns {string[][]} An array of strings, sorted in ascending order of z
 *     indices, of the Conway Cube
 */
function converCubeToString(cube: Cube): string[][] {
  const zs = Object.keys(cube).map(Number).sort((a, b) => a - b);
  const ys = Object.keys(cube[zs[0]]).map(Number).sort((a, b) => a - b);
  const xs = Object.keys(cube[zs[0]][ys[0]]).map(Number).sort((a, b) => a - b);
  const layers = [];

  for (const z of zs) {
    const layer = [];

    for (const y of ys) {
      let row = '';

      for (const x of xs) {
        row += cube[z][y][x];
      }

      layer.push(row);
    }

    layers.push(layer);
  }

  return layers;
}