import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  solverPart1
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 7: Handy Haversacks (Part 1)', () => {
  describe('someFunction()', () => {
    // Given example.
    it([
      `should do something.`
    ].join(''), () => {
      
    });
  });
});

describe('Day 7: Handy Haversacks (Part 2)', () => {
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
