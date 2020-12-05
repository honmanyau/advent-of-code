import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  solverPart1,
  validateByr,
  validateEcl,
  validateEyr,
  validateHcl,
  validateHgt,
  validateIyr,
  validatePassport,
  validatePid,
  solverPart2
} from './index';


const examplePathnamePart1 = path.resolve(__dirname, './example-part-1.txt');
const examplePathnamePart2 = path.resolve(__dirname, './example-part-2.txt');
const exampleFilePart1 = fs.readFileSync(examplePathnamePart1, 'utf-8');
const exampleFilePart2 = fs.readFileSync(examplePathnamePart2, 'utf-8');
const examplePart1 = processFile(exampleFilePart1);
const examplePart2 = processFile(exampleFilePart2);

describe('Day 5: Binary Boarding (Part 1)', () => {
  it([
    `solverPart1() does something.`
  ].join(''), () => {
    //
  });
});

// ===============
// == Functions ==
// ===============