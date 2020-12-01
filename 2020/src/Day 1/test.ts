import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import { solve } from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = exampleFile.trim().split('\n').map(Number);
const challengePathname = path.resolve(__dirname, './input.txt');
const challengeFile = fs.readFileSync(challengePathname, 'utf-8');
const challenge = challengeFile.trim().split('\n').map(Number);

describe('Day 1: Report Repair', () => {
  it([
    `should return ${yellow(514579)} for the example input:`,
    ` [ ${example.join(' ')} ]`
  ].join(''), () => {
    const solution = solve(example);
    
    assert.strictEqual(solution, 514579);
  });

  it([
    `should return ${yellow(0)} for the input:`,
    ` [ 0, 200, 900, 700, 2020 ]`
  ].join(''), () => {
    const testExample = [ 0, 200, 900, 700, 2020 ];
    const solution = solve(testExample);

    assert.strictEqual(solution, 0);
  });

  it([
    `should throw an error if for the example input if ${yellow(1721)}`,
    ` is removed from the example arrary: [ ${example.join(' ')} ]`
  ].join(''), () => {
    const errorExample = example.filter((val) => val !== 1721);

    assert.throws(() => { solve(errorExample) }, Error);
  });

  it([
    `should throw an error if for the example input if ${yellow(299)}`,
    ` is removed from the example arrary: [ ${example.join(' ')} ]`
  ].join(''), () => {
    const errorExample = example.filter((val) => val !== 299);

    assert.throws(() => { solve(errorExample) }, Error);
  });

  it([
    `should throw an error if the array contains only one instance of`,
    ` ${yellow(1010)}, for example: [ 900, 1010, 1020 ]`
  ].join(''), () => {
    const testExample = [ 900, 1010, 1020 ];

    assert.throws(() => { solve(testExample) }, Error);
  });
});