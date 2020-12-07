import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processEntry,
  processFile,
  solverPart1
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

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
      const solution = solverPart1(example, 'shiny gold');

      assert.strictEqual(solution, 4);
    });

    it([
      `should return ${yellow(3)} for the example if the content of the`,
      ' "bright white" bag is removed from the example.'
    ].join(''), () => {
      const modifiedExample = { ...example };

      modifiedExample['bright white'] = { name: 'bright white', content: [] };

      const solution = solverPart1(modifiedExample, 'shiny gold');

      assert.strictEqual(solution, 3);
    });

    it([
      `should return ${yellow(3)} for the example if the content of the`,
      ' "muted yellow" bag is removed from the example.'
    ].join(''), () => {
      const modifiedExample = { ...example };

      modifiedExample['muted yellow'] = { name: 'muted yellow', content: [] };

      const solution = solverPart1(modifiedExample, 'shiny gold');

      assert.strictEqual(solution, 3);
    });

    it([
      `should return ${yellow(3)} for the example if the content of the`,
      ' "dark orange" bag is removed from the example.'
    ].join(''), () => {
      const modifiedExample = { ...example };

      modifiedExample['dark orange'] = { name: 'dark orange', content: [] };

      const solution = solverPart1(modifiedExample, 'shiny gold');

      assert.strictEqual(solution, 3);
    });

    it([
      `should return ${yellow(3)} for the example if the content of the`,
      ' "light red" bag is removed from the example.'
    ].join(''), () => {
      const modifiedExample = { ...example };

      modifiedExample['light red'] = { name: 'light red', content: [] };

      const solution = solverPart1(modifiedExample, 'shiny gold');

      assert.strictEqual(solution, 3);
    });

    it([
      `should return ${yellow(0)} for the example if the content of both the`,
      ' "bright white" and "muted yellow" bags are removed from the example.'
    ].join(''), () => {
      const modifiedExample = { ...example };

      modifiedExample['bright white'] = { name: 'bright white', content: [] };
      modifiedExample['muted yellow'] = { name: 'muted yellow', content: [] };

      const solution = solverPart1(modifiedExample, 'shiny gold');

      assert.strictEqual(solution, 0);
    });
  });
});

describe('Day 7: Handy Haversacks (Part 2)', () => {
  describe('someFunction()', () => {
    // Given example.
    it([
      `should do something.`
    ].join(''), () => {
      
    });
  });
});

// ===============
// == Functions ==
// ===============
