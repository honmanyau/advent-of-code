import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import {
  evolve,
  processFile,
  processLine,
  solverPart1,
  solverPart2
} from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = processFile(exampleFile);

describe('Day 11: Seating System (Part 1)', () => {
  describe(`evolve()`, () => {
    it([
      `should lead the following plan after one interation:`,
      `#.##.##.##`,
      `#######.##`,
      `#.#.#..#..`,
      `####.##.##`,
      `#.##.##.##`,
      `#.#####.##`,
      `..#.#.....`,
      `##########`,
      `#.######.#`,
      `#.#####.##`
    ].join(''), () => {
      const solution = evolve(example).toString();
      const expected = [
        `#.##.##.##`,
        `#######.##`,
        `#.#.#..#..`,
        `####.##.##`,
        `#.##.##.##`,
        `#.#####.##`,
        `..#.#.....`,
        `##########`,
        `#.######.#`,
        `#.#####.##`
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });

    it([
      `should lead the following plan after one interation:`,
      `#.##.##.##`,
      `#######.##`,
      `#.#.#..#..`,
      `####.##.##`,
      `#.##.##.##`,
      `#.#####.##`,
      `..#.#.....`,
      `##########`,
      `#.######.#`,
      `#.#####.##`
    ].join(''), () => {
      const solution = evolve(example).toString();
      const expected = [
        `#.##.##.##`,
        `#######.##`,
        `#.#.#..#..`,
        `####.##.##`,
        `#.##.##.##`,
        `#.#####.##`,
        `..#.#.....`,
        `##########`,
        `#.######.#`,
        `#.#####.##`
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });

    it([
      `should lead the following plan after one interation:`,
      `#.LL.L#.##`,
      `#LLLLLL.L#`,
      `L.L.L..L..`,
      `#LLL.LL.L#`,
      `#.LL.LL.LL`,
      `#.LLLL#.##`,
      `..L.L.....`,
      `#LLLLLLLL#`,
      `#.LLLLLL.L`,
      `#.#LLLL.##`
    ].join(''), () => {
      const solution = evolve(example, 2).toString();
      const expected = [
        `#.LL.L#.##`,
        `#LLLLLL.L#`,
        `L.L.L..L..`,
        `#LLL.LL.L#`,
        `#.LL.LL.LL`,
        `#.LLLL#.##`,
        `..L.L.....`,
        `#LLLLLLLL#`,
        `#.LLLLLL.L`,
        `#.#LLLL.##`
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });

    it([
      `should lead the following plan after one interation:`,
      `#.##.L#.##`,
      `#L###LL.L#`,
      `L.#.#..#..`,
      `#L##.##.L#`,
      `#.##.LL.LL`,
      `#.###L#.##`,
      `..#.#.....`,
      `#L######L#`,
      `#.LL###L.L`,
      `#.#L###.##`
    ].join(''), () => {
      const solution = evolve(example, 3).toString();
      const expected = [
        `#.##.L#.##`,
        `#L###LL.L#`,
        `L.#.#..#..`,
        `#L##.##.L#`,
        `#.##.LL.LL`,
        `#.###L#.##`,
        `..#.#.....`,
        `#L######L#`,
        `#.LL###L.L`,
        `#.#L###.##`
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });

    it([
      `should lead the following plan after one interation:`,
      `#.#L.L#.##`,
      `#LLL#LL.L#`,
      `L.L.L..#..`,
      `#LLL.##.L#`,
      `#.LL.LL.LL`,
      `#.LL#L#.##`,
      `..L.L.....`,
      `#L#LLLL#L#`,
      `#.LLLLLL.L`,
      `#.#L#L#.##`
    ].join(''), () => {
      const solution = evolve(example, 4).toString();
      const expected = [
        `#.#L.L#.##`,
        `#LLL#LL.L#`,
        `L.L.L..#..`,
        `#LLL.##.L#`,
        `#.LL.LL.LL`,
        `#.LL#L#.##`,
        `..L.L.....`,
        `#L#LLLL#L#`,
        `#.LLLLLL.L`,
        `#.#L#L#.##`
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });

    it([
      `should lead the following plan after one interation:`,
      `#.#L.L#.##`,
      `#LLL#LL.L#`,
      `L.#.L..#..`,
      `#L##.##.L#`,
      `#.#L.LL.LL`,
      `#.#L#L#.##`,
      `..L.L.....`,
      `#L#L##L#L#`,
      `#.LLLLLL.L`,
      `#.#L#L#.##`
    ].join(''), () => {
      const solution = evolve(example, 5).toString();
      const expected = [
        `#.#L.L#.##`,
        `#LLL#LL.L#`,
        `L.#.L..#..`,
        `#L##.##.L#`,
        `#.#L.LL.LL`,
        `#.#L#L#.##`,
        `..L.L.....`,
        `#L#L##L#L#`,
        `#.LLLLLL.L`,
        `#.#L#L#.##`
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });
  });

  describe(`sovlerPart1()`, () => {
    it([
      `should do something.`
    ].join(''), () => {
      const solution = solverPart1(example);
    });
  });
});

describe('Day 11: Seating System (Part 2)', () => {
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
