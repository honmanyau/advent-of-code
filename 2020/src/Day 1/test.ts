import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import { solvePart1 } from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = exampleFile.trim().split('\n').map(Number);

describe('Day 1: Report Repair', () => {
  it([
    `should return ${yellow(514579)} for the example input:`,
    ` [ ${example.join(' ')} ]`
  ].join(''), () => {
    const solution = solvePart1(example);
    
    assert.strictEqual(solution, 514579);
  });

  it([
    `should return ${yellow(0)} for the input:`,
    ` [ 0, 200, 900, 700, 2020 ]`
  ].join(''), () => {
    const testExample = [ 0, 200, 900, 700, 2020 ];
    const solution = solvePart1(testExample);

    assert.strictEqual(solution, 0);
  });

  it([
    `should throw an error if for the example input if ${yellow(1721)}`,
    ` is removed from the example arrary: [ ${example.join(' ')} ]`
  ].join(''), () => {
    const errorExample = example.filter((val) => val !== 1721);

    assert.throws(() => { solvePart1(errorExample) }, Error);
  });

  it([
    `should throw an error if for the example input if ${yellow(299)}`,
    ` is removed from the example arrary: [ ${example.join(' ')} ]`
  ].join(''), () => {
    const errorExample = example.filter((val) => val !== 299);

    assert.throws(() => { solvePart1(errorExample) }, Error);
  });

  it([
    `should throw an error if the array contains only one instance of`,
    ` ${yellow(1010)}, for example: [ 900, 1010, 1020 ]`
  ].join(''), () => {
    const testExample = [ 900, 1010, 1020 ];

    assert.throws(() => { solvePart1(testExample) }, Error);
  });
});