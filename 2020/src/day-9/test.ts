import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 9: Encoding Error (Part 1)', () => {
  describe(`sovlerPart1()`, () => {
    it([
      `should do something.`
    ].join(''), () => {
      const solution = solverPart1(example);
    });
  });
});

describe('Day 9: Encoding Error (Part 2)', () => {
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
