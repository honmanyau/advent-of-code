import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import { processFile, solverPart1 } from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 4: Passport Processing (Part 1)', () => {
  it([
    `solverPart1()`
  ].join(''), () => {
    
  });
});

// ===============
// == Functions ==
// ===============