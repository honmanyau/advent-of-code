import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  countCommonYeses,
  countUniqueYeses,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day X: XXXXXXX (Part 1)', () => {
  describe('someFunction()', () => {
    // Given example.
    it([
      `should do something.`
    ].join(''), () => {
      
    });
  });
});

describe('Day X: XXXXXXX (Part 2)', () => {
  describe('someFunction()', () => {
    // Given example.
    it([
      `should do something.`
    ].join(''), () => {
      
    });
  });
});

// ===============
// == Functions ==
// ===============
