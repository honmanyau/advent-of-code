import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import {
  processFile,
  play,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 15: Rambunctious Recitation (Part 1)', () => {
  describe(`play()`, () => {
    // Given example.
    it([
      `should return 0 for the 1st turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 1);

      assert.strictEqual(solution, 0);
    });
    
    // Given example.
    it([
      `should return 3 for the 2nd turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 2);

      assert.strictEqual(solution, 3);
    });
    
    // Given example.
    it([
      `should return 6 for the 3rd turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 3);

      assert.strictEqual(solution, 6);
    });
    
    // Given example.
    it([
      `should return 0 for the 4th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 4);

      assert.strictEqual(solution, 0);
    });
    
    // Given example.
    it([
      `should return 3 for the 5th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 5);

      assert.strictEqual(solution, 3);
    });
    
    // Given example.
    it([
      `should return 3 for the 6th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 6);

      assert.strictEqual(solution, 3);
    });
    
    // Given example.
    it([
      `should return 1 for the 7th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 7);

      assert.strictEqual(solution, 1);
    });
    
    // Given example.
    it([
      `should return 0 for the 8th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 8);

      assert.strictEqual(solution, 0);
    });
    
    // Given example.
    it([
      `should return 4 for the 9th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 9);

      assert.strictEqual(solution, 4);
    });
    
    // Given example.
    it([
      `should return 0 for the 10th turn of the game.`
    ].join(''), () => {
      const solution = play([ 0, 3, 6 ], 10);

      assert.strictEqual(solution, 0);
    });
  });

  describe('solverPart1()', () => {
    // Given example.
    it([
      `should return 1 for the starting sequence [ 1, 3, 2 ].`
    ].join(''), () => {
      const solution = solverPart1([ 1, 3, 2 ]);

      assert.strictEqual(solution, 1);
    });

    // Given example.
    it([
      `should return 10 for the starting sequence [ 2, 1, 3 ].`
    ].join(''), () => {
      const solution = solverPart1([ 2, 1, 3 ]);

      assert.strictEqual(solution, 10);
    });

    // Given example.
    it([
      `should return 27 for the starting sequence [ 1, 2, 3 ].`
    ].join(''), () => {
      const solution = solverPart1([ 1, 2, 3 ]);

      assert.strictEqual(solution, 27);
    });
    
    // Given example.
    it([
      `should return 78 for the starting sequence [ 2, 3, 1 ].`
    ].join(''), () => {
      const solution = solverPart1([ 2, 3, 1 ]);

      assert.strictEqual(solution, 78);
    });

    // Given example.
    it([
      `should return 438 for the starting sequence [ 3, 2, 1 ].`
    ].join(''), () => {
      const solution = solverPart1([ 3, 2, 1 ]);

      assert.strictEqual(solution, 438);
    });

    // Given example.
    it([
      `should return 1836 for the starting sequence [ 3, 1, 2 ].`
    ].join(''), () => {
      const solution = solverPart1([ 3, 1, 2 ]);

      assert.strictEqual(solution, 1836);
    });
  });
});

describe('Day 15: Rambunctious Recitation (Part 2)', () => {
  describe('solverPart2()', () => {
    // Given example.
    it([
      `should return 175594 for the starting sequence [ 0, 3, 6 ].`
    ].join(''), () => {
      const solution = solverPart2([ 0, 3, 6 ]);

      assert.strictEqual(solution, 175594);
    });
    
    // Given example.
    it([
      `should return 2578 for the starting sequence [ 1, 3, 2 ].`
    ].join(''), () => {
      const solution = solverPart2([ 1, 3, 2 ]);

      assert.strictEqual(solution, 2578);
    });

    // Given example.
    it([
      `should return 3544142 for the starting sequence [ 2, 1, 3 ].`
    ].join(''), () => {
      const solution = solverPart2([ 2, 1, 3 ]);

      assert.strictEqual(solution, 3544142);
    });

    // Given example.
    it([
      `should return 261214 for the starting sequence [ 1, 2, 3 ].`
    ].join(''), () => {
      const solution = solverPart2([ 1, 2, 3 ]);

      assert.strictEqual(solution, 261214);
    });

    // Given example.
    it([
      `should return 6895259 for the starting sequence [ 2, 3, 1 ].`
    ].join(''), () => {
      const solution = solverPart2([ 2, 3, 1 ]);

      assert.strictEqual(solution, 6895259);
    });

    // Given example.
    it([
      `should return 18 for the starting sequence [ 3, 2, 1 ].`
    ].join(''), () => {
      const solution = solverPart2([ 3, 2, 1 ]);

      assert.strictEqual(solution, 18);
    });

    // Given example.
    it([
      `should return 362 for the starting sequence [ 3, 1, 2 ].`
    ].join(''), () => {
      const solution = solverPart2([ 3, 1, 2 ]);

      assert.strictEqual(solution, 362);
    });
  });
});

// ===============
// == Functions ==
// ===============
