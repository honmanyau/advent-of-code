import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import {
  processFile,
  countUniqueYeses,
  solverPart1
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

console.log(example);

describe('Day 6: Custom Customs (Part 1)', () => {
  describe('countUniqueYeses()', () => {
    // Given example.
    it([
      `should count ${yellow(1)} for the input [ 'a' ]`
    ].join(''), () => {
      const count = countUniqueYeses([ 'a' ]);

      assert.strictEqual(count, 1);
    });

    it([
      `should count ${yellow(2)} for the input [ 'ab' ]`
    ].join(''), () => {
      const count = countUniqueYeses([ 'ab' ]);

      assert.strictEqual(count, 2);
    });

    it([
      `should count ${yellow(3)} for the input [ 'abc' ]`
    ].join(''), () => {
      const count = countUniqueYeses([ 'abc' ]);

      assert.strictEqual(count, 3);
    });

    it([
      `should count ${yellow(2)} for the input [ 'a', 'ab' ]`
    ].join(''), () => {
      const count = countUniqueYeses([ 'a', 'ab' ]);

      assert.strictEqual(count, 2);
    });

    it([
      `should count ${yellow(3)} for the input [ 'a', 'abc' ]`
    ].join(''), () => {
      const count = countUniqueYeses([ 'a', 'abc' ]);

      assert.strictEqual(count, 3);
    });

    it([
      `should count ${yellow(3)} for the input [ 'ab', 'abc' ]`
    ].join(''), () => {
      const count = countUniqueYeses([ 'ab', 'abc' ]);

      assert.strictEqual(count, 3);
    });

    it([
      `should count ${yellow(3)} for the input [ 'abc', 'abc' ]`
    ].join(''), () => {
      const count = countUniqueYeses([ 'abc', 'abc' ]);

      assert.strictEqual(count, 3);
    });

    describe('countUniqueYeses()', () => {
      // Given example.
      it([
        `should count ${yellow(3)} for the input [ 'a', 'b', 'c' ]`
      ].join(''), () => {
        const count = countUniqueYeses([ 'a', 'b', 'c' ]);
  
        assert.strictEqual(count, 3);
      });
    });

    describe('countUniqueYeses()', () => {
      // Given example.
      it([
        `should count ${yellow(3)} for the input [ 'ab', 'ac' ]`
      ].join(''), () => {
        const count = countUniqueYeses([ 'ab', 'ac' ]);
  
        assert.strictEqual(count, 3);
      });
    });

    describe('countUniqueYeses()', () => {
      // Given example.
      it([
        `should count ${yellow(1)} for the input [ 'a', 'a', 'a', 'a' ]`
      ].join(''), () => {
        const count = countUniqueYeses([ 'a', 'a', 'a', 'a' ]);
  
        assert.strictEqual(count, 1);
      });
    });

    describe('countUniqueYeses()', () => {
      // Given example.
      it([
        `should count ${yellow(1)} for the input [ 'b' ]`
      ].join(''), () => {
        const count = countUniqueYeses([ 'b' ]);
  
        assert.strictEqual(count, 1);
      });
    });
  });
});

// ===============
// == Functions ==
// ===============