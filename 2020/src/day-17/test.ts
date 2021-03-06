import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  Cube,
  Hypercube,
  countActiveNodes,
  evolvePart1,
  evolvePart2,
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const cubeExample = processFile(exampleFile, 'cube');
const hypercubeExample = processFile(exampleFile, 'hypercube');

describe('Day 17: Conway Cubes (Part 1)', () => {
  describe(`evolvePart1()`, () => {
    it([
      `should produce the following output after 1 generation:`,
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
      const exampleCopy = JSON.parse(JSON.stringify(cubeExample));
      const solution = converCubeToString(evolvePart1(exampleCopy, 1));
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
      `should produce the following output after 2 generations:`,
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
      const exampleCopy = JSON.parse(JSON.stringify(cubeExample));
      const solution = converCubeToString(evolvePart1(exampleCopy, 2));
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
      `should produce the following output after 3 generation:`,
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
      const exampleCopy = JSON.parse(JSON.stringify(cubeExample));
      const solution = converCubeToString(evolvePart1(exampleCopy, 3));
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
  
  describe(`countActiveNodes()`, () => {
    it([
      `should return 5 for the unevolved example.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(cubeExample));
      const solution = countActiveNodes(exampleCopy, 'cube');

      assert.strictEqual(solution, 5);
    });

    it([
      `should return 11 for the example after 1 generation.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(cubeExample));
      const solution = countActiveNodes(evolvePart1(exampleCopy, 1), 'cube');

      assert.strictEqual(solution, 11);
    });

    it([
      `should return 21 for the example after 2 generations.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(cubeExample));
      const solution = countActiveNodes(evolvePart1(exampleCopy, 2), 'cube');

      assert.strictEqual(solution, 21);
    });

    it([
      `should return 38 for the example after 3 generations.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(cubeExample));
      const solution = countActiveNodes(evolvePart1(exampleCopy, 3), 'cube');

      assert.strictEqual(solution, 38);
    });
  });

  describe('solverPart1()', () => {
    it([
      `should return 112 for the example after 6 generations.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(cubeExample));
      const solution = solverPart1(exampleCopy);

      assert.strictEqual(solution, 112);
    });
  });
});

describe('Day 17: Conway Cubes (Part 2)', () => {
  describe(`evolvePart2()`, () => {
    it([
      `should produce the following output after 1 generation:`,
      `           z=-1, w=-1`,
      `           #..`,
      `           ..#`,
      `           .#.`,
      `           `,
      `           z=0, w=-1`,
      `           #..`,
      `           ..#`,
      `           .#.`,
      `           `,
      `           z=1, w=-1`,
      `           #..`,
      `           ..#`,
      `           .#.`,
      `           `,
      `           z=-1, w=0`,
      `           #..`,
      `           ..#`,
      `           .#.`,
      `           `,
      `           z=0, w=0`,
      `           #.#`,
      `           .##`,
      `           .#.`,
      `           `,
      `           z=1, w=0`,
      `           #..`,
      `           ..#`,
      `           .#.`,
      `           `,
      `           z=-1, w=1`,
      `           #..`,
      `           ..#`,
      `           .#.`,
      `           `,
      `           z=0, w=1`,
      `           #..`,
      `           ..#`,
      `           .#.`,
      `           `,
      `           z=1, w=1`,
      `           #..`,
      `           ..#`,
      `           .#.`,
      `           `
    ].join('\n'), () => {
      const exampleCopy = JSON.parse(JSON.stringify(hypercubeExample));
      const solution = convertHypercubeToString(evolvePart2(exampleCopy, 1));
      const expected = [
        [
          '#..',
          '..#',
          '.#.'
        ],
        [
          '#..',
          '..#',
          '.#.'
        ],
        [
          '#..',
          '..#',
          '.#.'
        ],
        [
          '#..',
          '..#',
          '.#.'
        ],
        [
          '#.#',
          '.##',
          '.#.'
        ],
        [
          '#..',
          '..#',
          '.#.'
        ],
        [
          '#..',
          '..#',
          '.#.'
        ],
        [
          '#..',
          '..#',
          '.#.'
        ],
        [
          '#..',
          '..#',
          '.#.'        
        ]
      ];

      assert.deepStrictEqual(solution, expected);
    });

    it([
      `should produce the following output after 2 generations:`,
      `           z=-2, w=-2`,
      `           .....`,
      `           .....`,
      `           ..#..`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=-1, w=-2`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=0, w=-2`,
      `           ###..`,
      `           ##.##`,
      `           #...#`,
      `           .#..#`,
      `           .###.`,
      `           `,
      `           z=1, w=-2`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=2, w=-2`,
      `           .....`,
      `           .....`,
      `           ..#..`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=-2, w=-1`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=-1, w=-1`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=0, w=-1`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=1, w=-1`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=2, w=-1`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=-2, w=0`,
      `           ###..`,
      `           ##.##`,
      `           #...#`,
      `           .#..#`,
      `           .###.`,
      `           `,
      `           z=-1, w=0`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=0, w=0`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=1, w=0`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=2, w=0`,
      `           ###..`,
      `           ##.##`,
      `           #...#`,
      `           .#..#`,
      `           .###.`,
      `           `,
      `           z=-2, w=1`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=-1, w=1`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=0, w=1`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=1, w=1`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=2, w=1`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=-2, w=2`,
      `           .....`,
      `           .....`,
      `           ..#..`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=-1, w=2`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=0, w=2`,
      `           ###..`,
      `           ##.##`,
      `           #...#`,
      `           .#..#`,
      `           .###.`,
      `           `,
      `           z=1, w=2`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           .....`,
      `           `,
      `           z=2, w=2`,
      `           .....`,
      `           .....`,
      `           ..#..`,
      `           .....`,
      `           .....`
    ].join('\n'), () => {
      const exampleCopy = JSON.parse(JSON.stringify(hypercubeExample));
      const solution = convertHypercubeToString(evolvePart2(exampleCopy, 2));
      const expected = [
        [
          '.....',
          '.....',
          '..#..',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '###..',
          '##.##',
          '#...#',
          '.#..#',
          '.###.'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '..#..',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '###..',
          '##.##',
          '#...#',
          '.#..#',
          '.###.'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '###..',
          '##.##',
          '#...#',
          '.#..#',
          '.###.'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '..#..',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '###..',
          '##.##',
          '#...#',
          '.#..#',
          '.###.'
        ],
        [
          '.....',
          '.....',
          '.....',
          '.....',
          '.....'
        ],
        [
          '.....',
          '.....',
          '..#..',
          '.....',
          '.....'
        ]
      ];

      assert.deepStrictEqual(solution, expected);
    });
  });

  describe(`countActiveNodes()`, () => {
    it([
      `should return 5 for the unevolved example.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(hypercubeExample));
      const solution = countActiveNodes(exampleCopy, 'hypercube');

      assert.strictEqual(solution, 5);
    });

    it([
      `should return 29 for the example after 1 generation.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(hypercubeExample));
      const solution = countActiveNodes(
        evolvePart2(exampleCopy, 1), 'hypercube'
      );

      assert.strictEqual(solution, 29);
    });

    it([
      `should return 60 for the example after 2 generations.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(hypercubeExample));
      const solution = countActiveNodes(
        evolvePart2(exampleCopy, 2), 'hypercube'
      );

      assert.strictEqual(solution, 60);
    });
  });

  describe('solverPart2()', () => {
    it([
      `should return 848 for the example after 6 generations.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(hypercubeExample));
      const solution = solverPart2(exampleCopy);

      assert.strictEqual(solution, 848);
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

/**
 * This function converts a Cube into an array of strings for easier testing
 * that doesn't involve indices.
 * @param {Hypercube} hypercube A Conway Cube or Hypercube.
 * @returns {string[][]} An array of strings, sorted in ascending order of z
 *     indices, of the Conway Cube
 */
function convertHypercubeToString(hypercube: Hypercube): string[][] {
  const ws = Object.keys(hypercube).map(Number).sort((a, b) => a - b);
  const zs = Object.keys(hypercube[ws[0]]).map(Number).sort((a, b) => a - b);
  const ys = Object.keys(hypercube[ws[0]][zs[0]]).map(Number)
    .sort((a, b) => a - b);
  const xs = Object.keys(hypercube[ws[0]][zs[0]][ys[0]]).map(Number)
    .sort((a, b) => a - b);
  const hyperlayers = [];

  for (const w of ws) {
    for (const z of zs) {
      const layer = [];

      for (const y of ys) {
        let row = '';

        for (const x of xs) {
          row += hypercube[w][z][y][x];
        }

        layer.push(row);
      }

      hyperlayers.push(layer);
    }
  }

  return hyperlayers;
}