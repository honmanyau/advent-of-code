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
      `        #.##.##.##`,
      `        #######.##`,
      `        #.#.#..#..`,
      `        ####.##.##`,
      `        #.##.##.##`,
      `        #.#####.##`,
      `        ..#.#.....`,
      `        ##########`,
      `        #.######.#`,
      `        #.#####.##`
    ].join('\n'), () => {
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
      `should lead the following plan after 1 interation:`,
      `        #.##.##.##`,
      `        #######.##`,
      `        #.#.#..#..`,
      `        ####.##.##`,
      `        #.##.##.##`,
      `        #.#####.##`,
      `        ..#.#.....`,
      `        ##########`,
      `        #.######.#`,
      `        #.#####.##`
    ].join('\n'), () => {
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
      `should lead the following plan after 2 interation:`,
      `        #.LL.L#.##`,
      `        #LLLLLL.L#`,
      `        L.L.L..L..`,
      `        #LLL.LL.L#`,
      `        #.LL.LL.LL`,
      `        #.LLLL#.##`,
      `        ..L.L.....`,
      `        #LLLLLLLL#`,
      `        #.LLLLLL.L`,
      `        #.#LLLL.##`
    ].join('\n'), () => {
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
      `should lead the following plan after 3 interation:`,
      `        #.##.L#.##`,
      `        #L###LL.L#`,
      `        L.#.#..#..`,
      `        #L##.##.L#`,
      `        #.##.LL.LL`,
      `        #.###L#.##`,
      `        ..#.#.....`,
      `        #L######L#`,
      `        #.LL###L.L`,
      `        #.#L###.##`
    ].join('\n'), () => {
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
      `should lead the following plan after 4 interation:`,
      `        #.#L.L#.##`,
      `        #LLL#LL.L#`,
      `        L.L.L..#..`,
      `        #LLL.##.L#`,
      `        #.LL.LL.LL`,
      `        #.LL#L#.##`,
      `        ..L.L.....`,
      `        #L#LLLL#L#`,
      `        #.LLLLLL.L`,
      `        #.#L#L#.##`
    ].join('\n'), () => {
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
      `should lead the following plan after 5 interation:`,
      `        #.#L.L#.##`,
      `        #LLL#LL.L#`,
      `        L.#.L..#..`,
      `        #L##.##.L#`,
      `        #.#L.LL.LL`,
      `        #.#L#L#.##`,
      `        ..L.L.....`,
      `        #L#L##L#L#`,
      `        #.LLLLLL.L`,
      `        #.#L#L#.##`
    ].join('\n'), () => {
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

    it([
      `should lead the following plan after 10 interation:`,
      `        #.#L.L#.##`,
      `        #LLL#LL.L#`,
      `        L.#.L..#..`,
      `        #L##.##.L#`,
      `        #.#L.LL.LL`,
      `        #.#L#L#.##`,
      `        ..L.L.....`,
      `        #L#L##L#L#`,
      `        #.LLLLLL.L`,
      `        #.#L#L#.##`
    ].join('\n'), () => {
      const solution = evolve(example, 10).toString();
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
      `should return 37 for the example.`
    ].join(''), () => {
      const solution = solverPart1(example);

      assert.strictEqual(solution, 37);
    });

    it([
      `should return 1 for the following layout:`,
      '           ...',
      '           .L.',
      '           ...'
    ].join('\n'), () => {
      const testInput = [
        '...',
        '.L.',
        '...'
      ].map(processLine);
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 1);
    });

    it([
      `should return 1 for the following layout:`,
      '           ...',
      '           .#.',
      '           ...'
    ].join(''), () => {
      const testInput = [
        '...',
        '.#.',
        '...'
      ].map(processLine);
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 1);
    });

    it([
      `should return 4 for the following layout:`,
      '           #.#',
      '           .#.',
      '           #.#'
    ].join('\n'), () => {
      const testInput = [
        '#.#',
        '.#.',
        '#.#'
      ].map(processLine);
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 4);
    });

    it([
      `should return 4 for the following layout:`,
      '           .#.',
      '           ###',
      '           .#.'
    ].join('\n'), () => {
      const testInput = [
        '.#.',
        '###',
        '.#.'
      ].map(processLine);
      const solution = solverPart1(testInput);

      assert.strictEqual(solution, 4);
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
