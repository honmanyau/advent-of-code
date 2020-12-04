import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  solverPart1,
  validateByr,
  validateIyr,
  validateEyr,
  validateHgt,
  validateHcl,
  validateEcl,
  validatePid,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

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

describe('Day 4: Passport Processing (Part 2)', () => {
  it([
    `validateByr() should return \`true\` for any number between, and`,
    ` including, ${yellow(1920)} and ${yellow(2002)}`
  ].join(''), () => {
    assert.strictEqual(validateByr('1920'), true);
    assert.strictEqual(validateByr('1921'), true);
    assert.strictEqual(validateByr('1987'), true);
    assert.strictEqual(validateByr('2001'), true);
    assert.strictEqual(validateByr('2002'), true);
  });

  it([
    `validateByr() should return \`false\` for any number outside of, and`,
    ` excluding, ${yellow(1920)} and ${yellow(2002)}`
  ].join(''), () => {
    assert.strictEqual(validateByr('999'), false);
    assert.strictEqual(validateByr('1919'), false);
    assert.strictEqual(validateByr('2003'), false); // Given example.
    assert.strictEqual(validateByr('10000'), false);
  });

  it([
    `validateIyr() should return \`true\` for any number between, and`,
    ` including, ${yellow(2010)} and ${yellow(2020)}`
  ].join(''), () => {
    assert.strictEqual(validateIyr('2010'), true);
    assert.strictEqual(validateIyr('2011'), true);
    assert.strictEqual(validateIyr('2012'), true);
    assert.strictEqual(validateIyr('2019'), true);
    assert.strictEqual(validateIyr('2020'), true);
  });

  it([
    `validateIyr() should return \`false\` for any number outside of, and`,
    ` excluding, ${yellow(2010)} and ${yellow(2020)}`
  ].join(''), () => {
    assert.strictEqual(validateIyr('999'), false);
    assert.strictEqual(validateIyr('2009'), false);
    assert.strictEqual(validateIyr('2021'), false);
    assert.strictEqual(validateIyr('10000'), false);
  });

  it([
    `validateEyr() should return \`true\` for any number between, and`,
    ` including, ${yellow(2020)} and ${yellow(2030)}`
  ].join(''), () => {
    assert.strictEqual(validateEyr('2020'), true);
    assert.strictEqual(validateEyr('2021'), true);
    assert.strictEqual(validateEyr('2025'), true);
    assert.strictEqual(validateEyr('2029'), true);
    assert.strictEqual(validateEyr('2030'), true);
  });

  it([
    `validateEyr() should return \`false\` for any number outside of, and`,
    ` excluding, ${yellow(2020)} and ${yellow(2030)}`
  ].join(''), () => {
    assert.strictEqual(validateEyr('999'), false);
    assert.strictEqual(validateEyr('2019'), false);
    assert.strictEqual(validateEyr('2031'), false);
    assert.strictEqual(validateEyr('10000'), false);
  });

  it([
    `validateHgt() should return \`true\` for any height between, and`,
    ` including, ${yellow(150)} cm and ${yellow(193)} cm`
  ].join(''), () => {
    assert.strictEqual(validateHgt('150cm'), true);
    assert.strictEqual(validateHgt('151cm'), true);
    assert.strictEqual(validateHgt('180cm'), true);
    assert.strictEqual(validateHgt('192cm'), true);
    assert.strictEqual(validateHgt('193cm'), true);
  });

  it([
    `validateHgt() should return \`false\` for any height outside of, and`,
    ` excluding, ${yellow(150)} cm and ${yellow(193)} cm`
  ].join(''), () => {
    assert.strictEqual(validateHgt('100cm'), false);
    assert.strictEqual(validateHgt('149cm'), false);
    assert.strictEqual(validateHgt('194cm'), false);
    assert.strictEqual(validateHgt('250cm'), false);
  });

  it([
    `validateHgt() should return \`true\` for any height between, and`,
    ` including, ${yellow(59)} in and ${yellow(76)} in`
  ].join(''), () => {
    assert.strictEqual(validateHgt('59in'), true);
    assert.strictEqual(validateHgt('60in'), true);
    assert.strictEqual(validateHgt('70in'), true);
    assert.strictEqual(validateHgt('75in'), true);
    assert.strictEqual(validateHgt('76in'), true);
  });

  it([
    `validateHgt() should return \`false\` for any height outside of, and`,
    ` excluding, ${yellow(59)} in and ${yellow(76)} in`
  ].join(''), () => {
    assert.strictEqual(validateHgt('57in'), false);
    assert.strictEqual(validateHgt('58in'), false);
    assert.strictEqual(validateHgt('77in'), false);
    assert.strictEqual(validateHgt('78in'), false);
    assert.strictEqual(validateHgt('190in'), false); // Given example.
  });
  
  it([
    `validateHgt() should return \`false\` for any input that does not contain`,
    ' a valid unit.'
  ].join(''), () => {
    assert.strictEqual(validateHgt('150'), false);
    assert.strictEqual(validateHgt('193'), false);
    assert.strictEqual(validateHgt('59'), false);
    assert.strictEqual(validateHgt('76'), false);
    assert.strictEqual(validateHgt('150c'), false);
    assert.strictEqual(validateHgt('193c'), false);
    assert.strictEqual(validateHgt('150m'), false);
    assert.strictEqual(validateHgt('193m'), false);
    assert.strictEqual(validateHgt('59i'), false);
    assert.strictEqual(validateHgt('76i'), false);
    assert.strictEqual(validateHgt('59n'), false);
    assert.strictEqual(validateHgt('76n'), false);
    assert.strictEqual(validateHgt('190'), false); // Given example.
  });

  it([
    'validateHcl() should return \`true\` for any valid hexadecimal colour',
    ' code.'
  ].join(''), () => {
    assert.strictEqual(validateHcl('#123abc'), true); // Given example.
    assert.strictEqual(validateHcl('#000000'), true);
    assert.strictEqual(validateHcl('#ffffff'), true);
    assert.strictEqual(validateHcl('#1ce1ce'), true);
    assert.strictEqual(validateHcl('#c0ffee'), true);
  });

  it([
    'validateHcl() should return \`false\` for any input that is not a',
    ' hexadecimal colour code.'
  ].join(''), () => {
    assert.strictEqual(validateHcl('#123abz'), false); // Given example.
    assert.strictEqual(validateHcl('#0000000'), false);
    assert.strictEqual(validateHcl('#fffffff'), false);
    assert.strictEqual(validateHcl('#1ce1cee'), false);
    assert.strictEqual(validateHcl('#c0ffeee'), false);
    assert.strictEqual(validateHcl('123abc'), false); // Given example.
    assert.strictEqual(validateHcl('000000'), false);
    assert.strictEqual(validateHcl('ffffff'), false);
    assert.strictEqual(validateHcl('1ce1ce'), false);
    assert.strictEqual(validateHcl('c0ffee'), false);
  });

  it([
    'validateEcl() should return \`true\` for any input that is one of the',
    ` following: 'amb' 'blu' 'brn' 'gry' 'grn' 'hzl' 'oth'`
  ].join(''), () => {
    assert.strictEqual(validateEcl('amb'), true);
    assert.strictEqual(validateEcl('blu'), true);
    assert.strictEqual(validateEcl('brn'), true); // Given example.
    assert.strictEqual(validateEcl('gry'), true);
    assert.strictEqual(validateEcl('grn'), true);
    assert.strictEqual(validateEcl('hzl'), true);
    assert.strictEqual(validateEcl('oth'), true);
  });


  it([
    'validateEcl() should return \`false\` for any input that is one of the',
    ` following: 'amb' 'blu' 'brn' 'gry' 'grn' 'hzl' 'oth'`
  ].join(''), () => {
    assert.strictEqual(validateEcl('lol'), false);
    assert.strictEqual(validateEcl('wat'), false); // Given example.
    assert.strictEqual(validateEcl('omg'), false);
    assert.strictEqual(validateEcl('no'), false);
    assert.strictEqual(validateEcl('nein'), false);
  });

  it([
    'validatePid() should return \`true\` for any input that is a nine-digit',
    ` number, including leading zeroes`
  ].join(''), () => {
    assert.strictEqual(validatePid('000000001'), true); // Given example.
    assert.strictEqual(validatePid('100000000'), true);
    assert.strictEqual(validatePid('012345678'), true);
    assert.strictEqual(validatePid('123456789'), true);
  });
  
  it([
    'validatePid() should return \`false\` for any input that is a nine-digit',
    ` number, including leading zeroes`
  ].join(''), () => {
    assert.strictEqual(validatePid('00000001'), false); // Given example.
    assert.strictEqual(validatePid('12345678'), false);
    assert.strictEqual(validatePid('0000000001'), false);
    assert.strictEqual(validatePid('0123456789'), false);
    assert.strictEqual(validatePid('1234567890'), false);
  });
});

// ===============
// == Functions ==
// ===============