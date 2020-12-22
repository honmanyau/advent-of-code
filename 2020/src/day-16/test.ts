import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import {
  Notes,
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 16: Ticket Translation (Part 1)', () => {
  describe(`sovlerPart1()`, () => {
    it([
      `should do something.`
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
  describe('solverPart2()', () => {
    // Given example.
    it([
      `should do something.`
    ].join(''), () => {
      const solution = solverPart2(example);
    });
  });
});

// ===============
// == Functions ==
// ===============
