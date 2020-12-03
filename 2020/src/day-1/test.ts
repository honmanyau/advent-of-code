import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import { processFile, solverPart1, solverPart2 } from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 1: Report Repair (Part 1)', () => {
  it([
    `solvePart1() should return ${yellow(514579)} for the example input:`,
    ` [ ${example.join(' ')} ]`
  ].join(''), () => {
    const solution = solverPart1(example);
    
    assert.strictEqual(solution, 514579);
  });

  it([
    `solvePart1() should return ${yellow(0)} for the input:`,
    ` [ 0, 200, 900, 700, 2020 ]`
  ].join(''), () => {
    const testExample = [ 0, 200, 900, 700, 2020 ];
    const solution = solverPart1(testExample);

    assert.strictEqual(solution, 0);
  });

  it([
    'solvePart1() should throw an error if for the example input if',
    ` ${yellow(1721)} is removed from the example arrary:`,
    ` [ ${example.join(' ')} ]`
  ].join(''), () => {
    const errorExample = example.filter((val) => val !== 1721);

    assert.throws(() => { solverPart1(errorExample) }, Error);
  });

  it([
    'solvePart1() should throw an error if for the example input if',
    ` ${yellow(299)} is removed from the example arrary:`,
    ` [ ${example.join(' ')} ]`
  ].join(''), () => {
    const errorExample = example.filter((val) => val !== 299);

    assert.throws(() => { solverPart1(errorExample) }, Error);
  });

  it([
    'solvePart1() should throw an error if the array contains only one',
    ` instance of ${yellow(1010)}, for example: [ 900, 1010, 1020 ]`
  ].join(''), () => {
    const testExample = [ 900, 1010, 1020 ];

    assert.throws(() => { solverPart1(testExample) }, Error);
  });
});

describe('Day 1: Report Repair (Part 2)', () => {
  it([
    `solverPart2() should return ${yellow(241861950)} for the example input:`,
    ` [ ${example.join(' ')} ]`
  ].join(''), () => {
    const solution = solverPart2(example);
    
    assert.strictEqual(solution, 241861950);
  });

  it([
    `solverPart2() should return ${yellow(0)} for the example input:`,
    ` [ 0, 2020, 0, 1000, 1010, 900 ]`
  ].join(''), () => {
    const testExample = [ 0, 2020, 0, 1000, 1010, 900 ];
    const solution = solverPart2(testExample);
    
    assert.strictEqual(solution, 0);
  });

  it([
    `solverPart2() should return ${yellow(0)} for the example input:`,
    ` [ 0, 1010, 1010, 1000, 2000, 900 ]`
  ].join(''), () => {
    const testExample = [ 0, 1010, 1010, 1000, 2000, 900 ];
    const solution = solverPart2(testExample);
    
    assert.strictEqual(solution, 0);
  });

  it([
    'solverPart2() should throw an error if for the example input if',
    ` ${yellow(979)} is removed from the example arrary:`,
    ` [ ${example.join(' ')} ]`
  ].join(''), () => {
    const errorExample = example.filter((val) => val !== 979);

    assert.throws(() => { solverPart2(errorExample) }, Error);
  });

  it([
    'solverPart2() should throw an error if for the example input if',
    ` ${yellow(366)} is removed from the example arrary:`,
    ` [ ${example.join(' ')} ]`
  ].join(''), () => {
    const errorExample = example.filter((val) => val !== 366);

    assert.throws(() => { solverPart2(errorExample) }, Error);
  });

  it([
    'solverPart2() should throw an error if for the example input if',
    ` ${yellow(675)} is removed from the example arrary:`,
    ` [ ${example.join(' ')} ]`
  ].join(''), () => {
    const errorExample = example.filter((val) => val !== 675);

    assert.throws(() => { solverPart2(errorExample) }, Error);
  });

  it([
    'solverPart2() should throw an error for the input:',
    ' [ 0, 2020, 1000, 1010, 900 ]'
  ].join(''), () => {
    const testExample = [ 0, 2020, 1000, 1010, 900 ];

    assert.throws(() => { solverPart2(testExample) }, Error);
  });

  it([
    'solverPart2() should throw an error for the input:',
    ' [ 1010, 1010, 1000, 2000, 900 ]'
  ].join(''), () => {
    const testExample = [ 1010, 1010, 1000, 2000, 900 ];

    assert.throws(() => { solverPart2(testExample) }, Error);
  });
});