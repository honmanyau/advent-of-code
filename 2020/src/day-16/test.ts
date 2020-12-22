import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import {
  Notes,
  processFile,
  pruneInvalidTickets,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const inputPathname = path.resolve(__dirname, './input.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const inputFile = fs.readFileSync(inputPathname, 'utf-8');
const example = processFile(exampleFile);
const input = processFile(inputFile);

describe('Day 16: Ticket Translation (Part 1)', () => {
  describe(`sovlerPart1()`, () => {
    it([
      `should return 71 for the example in Part 1.`
    ].join(''), () => {
      const solution = solverPart1(example);
      
      assert.strictEqual(solution, 71);
    });

    it([
      `should return 0 for the following input:`,
      `         class: 1-3 or 5-7`,
      `         `,
      `         your ticket:`,
      `         7,1,14`,
      `         `,
      `         nearby tickets:`,
      `         1,3,5,7`
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          class: [ [ 1, 3 ], [ 5, 7 ] ]
        },
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 1, 3, 5, 7 ]
        ]
      };
      const solution = solverPart1(testInput);
      
      assert.strictEqual(solution, 0);
    });

    it([
      `should return 4 for the following input:`,
      `         class: 1-3 or 5-7`,
      `         `,
      `         your ticket:`,
      `         7,1,14`,
      `         `,
      `         nearby tickets:`,
      `         1,4,5,7`
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          class: [ [ 1, 3 ], [ 5, 7 ] ]
        },
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 1, 4, 5, 7 ]
        ]
      };
      const solution = solverPart1(testInput);
      
      assert.strictEqual(solution, 4);
    });

    it([
      `should return 8 for the following input:`,
      `         class: 1-3 or 5-7`,
      `         `,
      `         your ticket:`,
      `         7,1,14`,
      `         `,
      `         nearby tickets:`,
      `         1,3,5,8`
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          class: [ [ 1, 3 ], [ 5, 7 ] ]
        },
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 1, 3, 5, 8 ]
        ]
      };
      const solution = solverPart1(testInput);
      
      assert.strictEqual(solution, 8);
    });

    it([
      `should return 12 for the following input:`,
      `         class: 1-3 or 5-7`,
      `         `,
      `         your ticket:`,
      `         7,1,14`,
      `         `,
      `         nearby tickets:`,
      `         1,3,4,5,8`
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          class: [ [ 1, 3 ], [ 5, 7 ] ]
        },
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 1, 3, 4, 5, 8 ]
        ]
      };
      const solution = solverPart1(testInput);
      
      assert.strictEqual(solution, 12);
    });

    it([
      `should return 4 for the following input:`,
      `         class: 1-3 or 5-7`,
      `         `,
      `         your ticket:`,
      `         7,1,14`,
      `         `,
      `         nearby tickets:`,
      `         4`
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          class: [ [ 1, 3 ], [ 5, 7 ] ]
        },
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 4 ]
        ]
      };
      const solution = solverPart1(testInput);
      
      assert.strictEqual(solution, 4);
    });

    it([
      `should return 0 for the following input:`,
      `         class: 1-3 or 5-7`,
      `         `,
      `         your ticket:`,
      `         7,1,14`,
      `         `,
      `         nearby tickets:`,
      `         3`
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          class: [ [ 1, 3 ], [ 5, 7 ] ]
        },
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 3 ]
        ]
      };
      const solution = solverPart1(testInput);
      
      assert.strictEqual(solution, 0);
    });

    // It's unclear from the instructions whether or not invalid entries
    // of the same number are added only once or for everytime they appear, or
    // if each number only appears once.
    it([
      `should return 16 for the following input:`,
      `         class: 1-3 or 5-7`,
      `         `,
      `         your ticket:`,
      `         7,1,14`,
      `         `,
      `         nearby tickets:`,
      `         1,3,4,5,8`,
      `         2,4,7`
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          class: [ [ 1, 3 ], [ 5, 7 ] ]
        },
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 1, 3, 4, 5, 8 ],
          [ 2, 4, 7 ]
        ]
      };
      const solution = solverPart1(testInput);
      
      assert.strictEqual(solution, 16);
    });
  });
});

describe('Day 16: Ticket Translation (Part 2)', () => {
  describe('pruneInvalidTickets()', () => {
    it([
      `should remove all tickets but [ 7, 3, 47 ] when given the example.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const solution = pruneInvalidTickets(exampleCopy);

      assert.deepStrictEqual(solution.nearbyTickets, [ [ 7, 3, 47 ] ])
    });

    it([
      `should should leave the following ticket intact:`,
      `         class: 1-3 or 5-7`,
      `         `,
      `         your ticket:`,
      `         7,1,14`,
      `         `,
      `         nearby tickets:`,
      `         1,3,5,7`
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          class: [ [ 1, 3 ], [ 5, 7 ] ]
        },
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 1, 3, 5, 7 ]
        ]
      };
      const solution = pruneInvalidTickets(testInput);
      
      assert.deepStrictEqual(solution.nearbyTickets, [ [ 1, 3, 5, 7 ] ]);
    });

    it([
      `should remove the ticket [ 2, 4, 6, 8 ] nearbyTickets in:`,
      `         class: 1-3 or 5-7`,
      `         `,
      `         your ticket:`,
      `         7,1,14`,
      `         `,
      `         nearby tickets:`,
      `         1,3,5,7`,
      `         2,4,6,8`
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          class: [ [ 1, 3 ], [ 5, 7 ] ]
        },
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 1, 3, 5, 7 ],
          [ 2, 4, 6, 8 ]
        ]
      };
      const solution = pruneInvalidTickets(testInput);
      
      assert.deepStrictEqual(solution.nearbyTickets, [ [ 1, 3, 5, 7 ] ]);
    });

    it([
      `should remove all entries in nearbyTickets in:`,
      `         class: 1-3 or 5-7`,
      `         `,
      `         your ticket:`,
      `         7,1,14`,
      `         `,
      `         nearby tickets:`,
      `         1,3,5,7`,
      `         2,4,6,8`
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          class: [ [ 1, 3 ], [ 5, 7 ] ]
        },
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 1, 4, 5, 7 ],
          [ 2, 6, 8 ]
        ]
      };
      const solution = pruneInvalidTickets(testInput);
      
      assert.deepStrictEqual(solution.nearbyTickets, []);
    });

    it([
      `should cause the example to return 0 with solverPart1():`,
    ].join('\n'), () => {
      const exampleCopy = JSON.parse(JSON.stringify(example));
      const pruned = pruneInvalidTickets(exampleCopy);
      const solution = solverPart1(exampleCopy);
      
      assert.strictEqual(solution, 0);
    });

    it([
      `should cause the challenge input to return 0 with solverPart1():`,
    ].join('\n'), () => {
      const inputCopy = JSON.parse(JSON.stringify(input));
      const pruned = pruneInvalidTickets(inputCopy);
      const solution = solverPart1(inputCopy);
      
      assert.strictEqual(solution, 0);
    });
  });

  describe('solverPart2()', () => {
    it([
      `should return 11 for the following input:`,
      `         class: 0-1 or 4-19`,
      `         departure-row: 0-5 or 8-19`,
      `         seat: 0-13 or 16-19`,
      `         `,
      `         your ticket:`,
      `         11,12,13`,
      `         `,
      `         nearby tickets:`,
      `         3,9,18`,
      `         15,1,5`,
      `         5,14,9`,
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          "class": [ [ 0, 1 ], [ 4, 19 ] ],
          "departure-row": [ [ 0, 5 ], [ 8, 19 ] ],
          "seat": [ [ 0, 13 ], [ 16, 19 ] ]
        },
        myTicket: [ 11, 12, 13 ],
        nearbyTickets: [
          [ 3, 9, 18 ],
          [ 15, 1, 5 ],
          [ 5, 14, 9 ]
        ]
      };
      const solution = solverPart2(testInput);

      assert.strictEqual(solution, 11);
    });

    it([
      `should return 132 for the following input:`,
      `         departure-class: 0-1 or 4-19`,
      `         departure-row: 0-5 or 8-19`,
      `         seat: 0-13 or 16-19`,
      `         `,
      `         your ticket:`,
      `         11,12,13`,
      `         `,
      `         nearby tickets:`,
      `         3,9,18`,
      `         15,1,5`,
      `         5,14,9`,
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          "departure-class": [ [ 0, 1 ], [ 4, 19 ] ],
          "departure-row": [ [ 0, 5 ], [ 8, 19 ] ],
          "seat": [ [ 0, 13 ], [ 16, 19 ] ]
        },
        myTicket: [ 11, 12, 13 ],
        nearbyTickets: [
          [ 3, 9, 18 ],
          [ 15, 1, 5 ],
          [ 5, 14, 9 ]
        ]
      };
      const solution = solverPart2(testInput);

      assert.strictEqual(solution, 132);
    });

    it([
      `should return 1716 for the following input:`,
      `         departure-class: 0-1 or 4-19`,
      `         departure-row: 0-5 or 8-19`,
      `         departure-seat: 0-13 or 16-19`,
      `         `,
      `         your ticket:`,
      `         11,12,13`,
      `         `,
      `         nearby tickets:`,
      `         3,9,18`,
      `         15,1,5`,
      `         5,14,9`,
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          "departure-class": [ [ 0, 1 ], [ 4, 19 ] ],
          "departure-row": [ [ 0, 5 ], [ 8, 19 ] ],
          "departure-seat": [ [ 0, 13 ], [ 16, 19 ] ]
        },
        myTicket: [ 11, 12, 13 ],
        nearbyTickets: [
          [ 3, 9, 18 ],
          [ 15, 1, 5 ],
          [ 5, 14, 9 ]
        ]
      };
      const solution = solverPart2(testInput);

      assert.strictEqual(solution, 1716);
    });

    it([
      `should return 1716 for the following input:`,
      `         departure-class: 0-1 or 4-19`,
      `         departure-row: 0-5 or 8-19`,
      `         departure-seat: 0-13 or 16-19`,
      `         `,
      `         your ticket:`,
      `         11,12,13`,
      `         `,
      `         nearby tickets:`,
      `         3,9,18`,
      `         15,1,5`,
      `         5,14,9`,
    ].join('\n'), () => {
      const testInput: Notes = {
        rules: {
          "departure-class": [ [ 0, 1 ], [ 4, 19 ] ],
          "departure-row": [ [ 0, 5 ], [ 8, 19 ] ],
          "departure-seat": [ [ 0, 13 ], [ 16, 19 ] ]
        },
        myTicket: [ 11, 12, 13 ],
        nearbyTickets: [
          [ 3, 9, 18 ],
          [ 15, 1, 5 ],
          [ 5, 14, 9 ]
        ]
      };
      const solution = solverPart2(testInput);

      assert.strictEqual(solution, 1716);
    });
  });
});

// ===============
// == Functions ==
// ===============
