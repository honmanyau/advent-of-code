import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processEntry,
  processFile,
  solverPart1,
  solverPart2,
  solverPart2Attempt2
} from './index';


const examplePathnamePart1 = path.resolve(__dirname, './example-part-1.txt');
const examplePathnamePart2 = path.resolve(__dirname, './example-part-2.txt');
const exampleFilePart1 = fs.readFileSync(examplePathnamePart1, 'utf-8');
const exampleFilePart2 = fs.readFileSync(examplePathnamePart2, 'utf-8');
const examplePart1 = processFile(exampleFilePart1);
const examplePart2 = processFile(exampleFilePart2);

describe('Day 7: Handy Haversacks (Part 1)', () => {
  describe('processEntry()', () => {
    // Given example.
    it([
      `should parse "light red bags contain 1 bright white bag, 2 muted yellow`,
      ` bags." to give the object:\n`,
      `        {\n`,
      `          name: 'light red'\n`,
      `          content: [\n`,
      `            { name: 'bright white', amount: 1 },\n`,
      `            { name: 'muted yellow', amount: 2 }\n`,
      `          ]\n`,
      `        }`
    ].join(''), () => {
      const testString =
        'light red bags contain 1 bright white bag, 2 muted yellow bags.';
      const entry = processEntry(testString);
      const expectedEntry = {
        name: 'light red',
        content: [
          { name: 'bright white', amount: 1 },
          { name: 'muted yellow', amount: 2 }
        ]
      };

      assert.deepStrictEqual(entry, expectedEntry);
    });

    // Given example.
    it([
      `should parse "vibrant plum bags contain 5 faded blue bags, 6 dotted`,
      ` black bags." to give the object:\n`,
      `        {\n`,
      `          name: 'vibrant plum'\n`,
      `          content: [\n`,
      `            { name: 'faded blue', amount: 5 },\n`,
      `            { name: 'dotted black', amount: 6 }\n`,
      `          ]\n`,
      `        }`
    ].join(''), () => {
      const testString =
        'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.';
      const entry = processEntry(testString);
      const expectedEntry = {
        name: 'vibrant plum',
        content: [
          { name: 'faded blue', amount: 5 },
          { name: 'dotted black', amount: 6 }
        ]
      };

      assert.deepStrictEqual(entry, expectedEntry);
    });

    // Given example.
    it([
      `should parse "bright white bags contain 1 shiny gold bag.`,
      ` to give the object:\n`,
      `        {\n`,
      `          name: 'bright white'\n`,
      `          content: [\n`,
      `            { name: 'shiny gold', amount: 1 }\n`,
      `          ]\n`,
      `        }`
    ].join(''), () => {
      const testString =
        'bright white bags contain 1 shiny gold bag.';
      const entry = processEntry(testString);
      const expectedEntry = {
        name: 'bright white',
        content: [
          { name: 'shiny gold', amount: 1 }
        ]
      };

      assert.deepStrictEqual(entry, expectedEntry);
    });


    // Given example.
    it([
      `should parse "faded blue bags contain no other bags.`,
      ` to give the object:\n`,
      `        {\n`,
      `          name: 'faded blue'\n`,
      `          content: []\n`,
      `        }`
    ].join(''), () => {
      const testString =
        'faded blue bags contain no other bags.';
      const entry = processEntry(testString);
      const expectedEntry = {
        name: 'faded blue',
        content: []
      };

      assert.deepStrictEqual(entry, expectedEntry);
    });
  });


  describe(`sovlerPart1()`, () => {
    it([
      `should return ${yellow(4)} for the example.`
    ].join(''), () => {
      const solution = solverPart1(examplePart1, 'shiny gold');

      assert.strictEqual(solution, 4);
    });

    it([
      `should return ${yellow(3)} for the example if the content of the`,
      ' "bright white" bag is removed from the example.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };

      modifiedExample['bright white'] = { name: 'bright white', content: [] };

      const solution = solverPart1(modifiedExample, 'shiny gold');

      assert.strictEqual(solution, 3);
    });

    it([
      `should return ${yellow(3)} for the example if the content of the`,
      ' "muted yellow" bag is removed from the example.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };

      modifiedExample['muted yellow'] = { name: 'muted yellow', content: [] };

      const solution = solverPart1(modifiedExample, 'shiny gold');

      assert.strictEqual(solution, 3);
    });

    it([
      `should return ${yellow(3)} for the example if the content of the`,
      ' "dark orange" bag is removed from the example.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };

      modifiedExample['dark orange'] = { name: 'dark orange', content: [] };

      const solution = solverPart1(modifiedExample, 'shiny gold');

      assert.strictEqual(solution, 3);
    });

    it([
      `should return ${yellow(3)} for the example if the content of the`,
      ' "light red" bag is removed from the example.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };

      modifiedExample['light red'] = { name: 'light red', content: [] };

      const solution = solverPart1(modifiedExample, 'shiny gold');

      assert.strictEqual(solution, 3);
    });

    it([
      `should return ${yellow(0)} for the example if the content of both the`,
      ' "bright white" and "muted yellow" bags are removed from the example.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };

      modifiedExample['bright white'] = { name: 'bright white', content: [] };
      modifiedExample['muted yellow'] = { name: 'muted yellow', content: [] };

      const solution = solverPart1(modifiedExample, 'shiny gold');

      assert.strictEqual(solution, 0);
    });
  });
});

describe('Day 7: Handy Haversacks (Part 2)', () => {
  describe('solverPart2()', () => {
    // Given example.
    it([
      `should return ${yellow(32)} for the example used in Part 1.`
    ].join(''), () => {
      const solution = solverPart2(examplePart1);

      assert.strictEqual(solution, 32);
    });

    it([
      `should return ${yellow(8)} for the example used in Part 1.`,
      ' if a "shiny gold" bag only contains 1 "dark olive" bag.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };

      modifiedExample['shiny gold'] = {
        name: 'shiny gold',
        content: [
          {
            name: 'dark olive',
            amount: 1
          }
        ]
      };

      const solution = solverPart2(modifiedExample);

      assert.strictEqual(solution, 8);
    });

    it([
      `should return ${yellow(24)} for the example used in Part 1.`,
      ' if a "shiny gold" bag only contains 2 "vibrant plum" bag.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };

      modifiedExample['shiny gold'] = {
        name: 'shiny gold',
        content: [
          {
            name: 'vibrant plum',
            amount: 2
          }
        ]
      };

      const solution = solverPart2(modifiedExample);

      assert.strictEqual(solution, 24);
    });

    it([
      `should return ${yellow(0)} for the example used in Part 1.`,
      ' if a "shiny gold" contains no bags.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };

      modifiedExample['shiny gold'] = {
        name: 'shiny gold',
        content: []
      };

      const solution = solverPart2(modifiedExample);

      assert.strictEqual(solution, 0);
    });

    // Given example.
    it([
      `should return ${yellow(126)} for the new example in Part 2.`
    ].join(''), () => {
      const solution = solverPart2(examplePart2);

      assert.strictEqual(solution, 126);
    });
  });

  describe('solverPart2Attempt2()', () => {
    // Given example.
    it([
      `should return ${yellow(32)} for the example used in Part 1.`
    ].join(''), () => {
      const solution = solverPart2Attempt2(examplePart1);
  
      assert.strictEqual(solution, 32);
    });
  
    it([
      `should return ${yellow(8)} for the example used in Part 1.`,
      ' if a "shiny gold" bag only contains 1 "dark olive" bag.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };
  
      modifiedExample['shiny gold'] = {
        name: 'shiny gold',
        content: [
          {
            name: 'dark olive',
            amount: 1
          }
        ]
      };
  
      const solution = solverPart2Attempt2(modifiedExample);
  
      assert.strictEqual(solution, 8);
    });
  
    it([
      `should return ${yellow(24)} for the example used in Part 1.`,
      ' if a "shiny gold" bag only contains 2 "vibrant plum" bag.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };
  
      modifiedExample['shiny gold'] = {
        name: 'shiny gold',
        content: [
          {
            name: 'vibrant plum',
            amount: 2
          }
        ]
      };
  
      const solution = solverPart2Attempt2(modifiedExample);
  
      assert.strictEqual(solution, 24);
    });
  
    it([
      `should return ${yellow(0)} for the example used in Part 1.`,
      ' if a "shiny gold" contains no bags.'
    ].join(''), () => {
      const modifiedExample = { ...examplePart1 };
  
      modifiedExample['shiny gold'] = {
        name: 'shiny gold',
        content: []
      };
  
      const solution = solverPart2Attempt2(modifiedExample);
  
      assert.strictEqual(solution, 0);
    });
  
    // Given example.
    it([
      `should return ${yellow(126)} for the new example in Part 2.`
    ].join(''), () => {
      const solution = solverPart2Attempt2(examplePart2);
  
      assert.strictEqual(solution, 126);
    });
  });
});

// ===============
// == Functions ==
// ===============
