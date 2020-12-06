import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  getRowNumber,
  getColNumber,
  getSeatId,
  solverPart1
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day X: XXXXXXX (Part 1)', () => {
  describe('someFunction()', () => {
    it([
      `should so something`
    ].join(''), () => {
      //
    });
  });
});

// ===============
// == Functions ==
// ===============