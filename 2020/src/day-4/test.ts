import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import { processFile, solverPart1 } from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

console.log(example);

describe('Day 4: Passport Processing (Part 1)', () => {
  it([
    `solverPart1() should identify ${yellow(2)} valid passport entries in the`,
    ' example input.'
  ].join(''), () => {
    const solution = solverPart1(example);
    
    assert.strictEqual(solution, 2);
  });

  it([
    `solverPart1() should identify ${yellow(1)} valid passport entries in the`,
    ' example input if the first entry is removed.'
  ].join(''), () => {
    const modifiedExample = [ ...example ].filter((_v, i) => i !== 0);
    const solution = solverPart1(modifiedExample);

    assert.strictEqual(solution, 1);
  });

  it([
    `solverPart1() should identify ${yellow(1)} valid passport entries in the`,
    ' example input if the third entry is removed.'
  ].join(''), () => {
    const modifiedExample = [ ...example ].filter((_v, i) => i !== 2);
    const solution = solverPart1(modifiedExample);

    assert.strictEqual(solution, 1);
  });

  it([
    `solverPart1() should identify ${yellow(2)} valid passport entries in the`,
    ' example input if the second entry is removed.'
  ].join(''), () => {
    const modifiedExample = [ ...example ].filter((_v, i) => i !== 1);
    const solution = solverPart1(modifiedExample);

    assert.strictEqual(solution, 2);
  });

  it([
    `solverPart1() should identify ${yellow(0)} valid passport entries in the`,
    ' example input if the first and third entry are removed.'
  ].join(''), () => {
    const modifiedExample = [ ...example ].filter((_v, i) => (
      i !== 0
      && i !== 2
    ));
    const solution = solverPart1(modifiedExample);

    assert.strictEqual(solution, 0);
  });

  it([
    `solverPart1() should identify ${yellow(2)} valid passport entries in the`,
    ' example input if the second and fourth entry are removed.'
  ].join(''), () => {
    const modifiedExample = [ ...example ].filter((_v, i) => (
      i !== 1
      && i !== 3
    ));
    const solution = solverPart1(modifiedExample);

    assert.strictEqual(solution, 2);
  });

  it([
    `solverPart1() should identify the follwing input without cid to be valid:`,
    ' { ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
    ' byr:1937 iyr:2017 hgt:183cm }'
  ].join(''), () => {
    const testInput = {
      ecl: 'gry',
      pid: '860033327',
      eyr: '2020',
      hcl: '#fffffd',
      byr: '1937',
      iyr: '2017',
      cid: '147',
      hgt: '183cm'
    };
    const solution = solverPart1([ testInput ]);

    assert.strictEqual(solution, 1);
  });

  it([
    `solverPart1() should identify the follwing input without ecl to be`,
    ' invalid: { pid:860033327 eyr:2020 hcl:#fffffd',
    ' byr:1937 iyr:2017 cid:147 hgt:183cm }'
  ].join(''), () => {
    const testInput = {
      pid: '860033327',
      eyr: '2020',
      hcl: '#fffffd',
      byr: '1937',
      iyr: '2017',
      cid: '147',
      hgt: '183cm'
    };
    const solution = solverPart1([ testInput ]);

    assert.strictEqual(solution, 0);
  });

  it([
    `solverPart1() should identify the follwing input without pid to be`,
    ' invalid: { ecl:gry hcl:#fffffd',
    ' byr:1937 iyr:2017 cid:147 hgt:183cm }'
  ].join(''), () => {
    const testInput = {
      ecl: 'gry',
      eyr: '2020',
      hcl: '#fffffd',
      byr: '1937',
      iyr: '2017',
      cid: '147',
      hgt: '183cm'
    };
    const solution = solverPart1([ testInput ]);

    assert.strictEqual(solution, 0);
  });

  it([
    `solverPart1() should identify the follwing input without eyr to be`,
    ' invalid: { ecl:gry pid:860033327 hcl:#fffffd',
    ' byr:1937 iyr:2017 cid:147 hgt:183cm }'
  ].join(''), () => {
    const testInput = {
      ecl: 'gry',
      pid: '860033327',
      hcl: '#fffffd',
      byr: '1937',
      iyr: '2017',
      cid: '147',
      hgt: '183cm'
    };
    const solution = solverPart1([ testInput ]);

    assert.strictEqual(solution, 0);
  });

  it([
    `solverPart1() should identify the follwing input without hcl to be`,
    ' invalid: { ecl:gry pid:860033327 eyr:2020',
    ' byr:1937 iyr:2017 cid:147 hgt:183cm }'
  ].join(''), () => {
    const testInput = {
      ecl: 'gry',
      pid: '860033327',
      eyr: '2020',
      hcl: '#fffffd',
      byr: '1937',
      iyr: '2017',
      cid: '147',
      hgt: '183cm'
    };
    const solution = solverPart1([ testInput ]);

    assert.strictEqual(solution, 0);
  });

  it([
    `solverPart1() should identify the follwing input without byr to be`,
    ' invalid: { ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
    ' byr:1937 iyr:2017 cid:147 hgt:183cm }'
  ].join(''), () => {
    const testInput = {
      ecl: 'gry',
      pid: '860033327',
      eyr: '2020',
      hcl: '#fffffd',
      iyr: '2017',
      cid: '147',
      hgt: '183cm'
    };
    const solution = solverPart1([ testInput ]);

    assert.strictEqual(solution, 0);
  });

  it([
    `solverPart1() should identify the follwing input without iyr to be`,
    ' invalid: { ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
    ' byr:1937 iyr:2017 cid:147 hgt:183cm }'
  ].join(''), () => {
    const testInput = {
      ecl: 'gry',
      pid: '860033327',
      eyr: '2020',
      hcl: '#fffffd',
      byr: '1937',
      cid: '147',
      hgt: '183cm'
    };
    const solution = solverPart1([ testInput ]);

    assert.strictEqual(solution, 0);
  });

  it([
    `solverPart1() should identify the follwing input without hgt to be`,
    ' invalid: { ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
    ' byr:1937 iyr:2017 cid:147 hgt:183cm }'
  ].join(''), () => {
    const testInput = {
      ecl: 'gry',
      pid: '860033327',
      eyr: '2020',
      hcl: '#fffffd',
      byr: '1937',
      iyr: '2017',
      cid: '147'
    };
    const solution = solverPart1([ testInput ]);

    assert.strictEqual(solution, 0);
  });
});

// ===============
// == Functions ==
// ===============