import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);
const exampleString = JSON.stringify(example);

describe('Day 19: Monster Messages (Part 1)', () => {
  describe(`sovlerPart1()`, () => {
    it([
      `should return 2 for the example.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(exampleString);
      const solution = solverPart1(exampleCopy);

      assert.strictEqual(solution, 2);
    });

    it([
      `should return 8 if the messages in the input are changed to the valid`,
      ` permations in the example`
    ].join(''), () => {
      const exampleCopy = JSON.parse(exampleString);

      exampleCopy.messages =
        `aaaabb aaabab abbabb abbbab aabaab aabbbb abaaab ababbb`.split(' ');

      const solution = solverPart1(exampleCopy);

      assert.strictEqual(solution, 8);
    });

    it([
      `should return 7 if the messages in the input are changed to the valid`,
      ` permations in the example except for the last entry.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(exampleString);

      exampleCopy.messages =
        `aaaabb aaabab abbabb abbbab aabaab aabbbb abaaab bbbbbb`.split(' ');

      const solution = solverPart1(exampleCopy);

      assert.strictEqual(solution, 7);
    });

    it([
      `should return 6 if the messages in the input are changed to the valid`,
      ` permations in the example except for the first and last entry.`
    ].join(''), () => {
      const exampleCopy = JSON.parse(exampleString);

      exampleCopy.messages =
        `aaaaaa aaabab abbabb abbbab aabaab aabbbb abaaab bbbbbb`.split(' ');

      const solution = solverPart1(exampleCopy);

      assert.strictEqual(solution, 6);
    });
  });
});

describe('Day 19: Monster Messages (Part 2)', () => {
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
