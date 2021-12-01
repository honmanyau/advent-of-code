import 'mocha';
import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { processFile, part1Solver, part2Solver } from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 1: Report Repair (Part 1)', () => {
  it([
    `part1Solver() should return 7 for the example input:`,
    ` [ ${example.join(' ')} ]`
  ].join(''), () => {
    const solution = part1Solver(example);
    
    assert.strictEqual(solution, 7);
  });
});