import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  Cube,
  countActiveNodes,
  evolvePart1,
  evolvePart2,
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

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
      const exampleCopy = JSON.parse(JSON.stringify(example));
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
      const exampleCopy = JSON.parse(JSON.stringify(example));
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
      const exampleCopy = JSON.parse(JSON.stringify(example));
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
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const solution = countActiveNodes(exampleCopy);

      assert.strictEqual(solution, 5);
    });

    it([
      `should return 11 for the example after 1 generation.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const solution = countActiveNodes(evolvePart1(exampleCopy, 1));

      assert.strictEqual(solution, 11);
    });

    it([
      `should return 21 for the example after 2 generations.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const solution = countActiveNodes(evolvePart1(exampleCopy, 2));

      assert.strictEqual(solution, 21);
    });

    it([
      `should return 38 for the example after 3 generations.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const solution = countActiveNodes(evolvePart1(exampleCopy, 3));

      assert.strictEqual(solution, 38);
    });
  });

  describe('solverPart1()', () => {
    it([
      `should return 112 for the example after 6 generations.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(example));
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
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const solution = converCubeToString(evolvePart2(exampleCopy, 1));
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
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const solution = converCubeToString(evolvePart2(exampleCopy, 2));
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