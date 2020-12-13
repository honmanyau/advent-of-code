import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import {
  evolvePart1,
  evolvePart2,
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
      `should lead the following plan after 1 interation:`,
      `          #.##.##.##`,
      `          #######.##`,
      `          #.#.#..#..`,
      `          ####.##.##`,
      `          #.##.##.##`,
      `          #.#####.##`,
      `          ..#.#.....`,
      `          ##########`,
      `          #.######.#`,
      `          #.#####.##`
    ].join('\n'), () => {
      const solution = evolvePart1(example).toString();
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
      `          #.LL.L#.##`,
      `          #LLLLLL.L#`,
      `          L.L.L..L..`,
      `          #LLL.LL.L#`,
      `          #.LL.LL.LL`,
      `          #.LLLL#.##`,
      `          ..L.L.....`,
      `          #LLLLLLLL#`,
      `          #.LLLLLL.L`,
      `          #.#LLLL.##`
    ].join('\n'), () => {
      const solution = evolvePart1(example, 2).toString();
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
      `          #.##.L#.##`,
      `          #L###LL.L#`,
      `          L.#.#..#..`,
      `          #L##.##.L#`,
      `          #.##.LL.LL`,
      `          #.###L#.##`,
      `          ..#.#.....`,
      `          #L######L#`,
      `          #.LL###L.L`,
      `          #.#L###.##`
    ].join('\n'), () => {
      const solution = evolvePart1(example, 3).toString();
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
      `          #.#L.L#.##`,
      `          #LLL#LL.L#`,
      `          L.L.L..#..`,
      `          #LLL.##.L#`,
      `          #.LL.LL.LL`,
      `          #.LL#L#.##`,
      `          ..L.L.....`,
      `          #L#LLLL#L#`,
      `          #.LLLLLL.L`,
      `          #.#L#L#.##`
    ].join('\n'), () => {
      const solution = evolvePart1(example, 4).toString();
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
      `          #.#L.L#.##`,
      `          #LLL#LL.L#`,
      `          L.#.L..#..`,
      `          #L##.##.L#`,
      `          #.#L.LL.LL`,
      `          #.#L#L#.##`,
      `          ..L.L.....`,
      `          #L#L##L#L#`,
      `          #.LLLLLL.L`,
      `          #.#L#L#.##`
    ].join('\n'), () => {
      const solution = evolvePart1(example, 5).toString();
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
      `          #.#L.L#.##`,
      `          #LLL#LL.L#`,
      `          L.#.L..#..`,
      `          #L##.##.L#`,
      `          #.#L.LL.LL`,
      `          #.#L#L#.##`,
      `          ..L.L.....`,
      `          #L#L##L#L#`,
      `          #.LLLLLL.L`,
      `          #.#L#L#.##`
    ].join('\n'), () => {
      const solution = evolvePart1(example, 10).toString();
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
      '          ...',
      '          .L.',
      '          ...'
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
      '          ...',
      '          .#.',
      '          ...'
    ].join('\n'), () => {
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
      '          #.#',
      '          .#.',
      '          #.#'
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
      '          .#.',
      '          ###',
      '          .#.'
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
  describe('evolvePart2()', () => {
    it([
      `should cause the middle seat to become occupied:`,
      '          .....',
      '          .....',
      '          ..L..',
      '          .....',
      '          .....'
    ].join('\n'), () => {
      const testInput = [
        '.....',
        '.....',
        '..L..',
        '.....',
        '.....'
      ].map(processLine);
      const solution = evolvePart2(testInput).toString();
      const expected = [
        '.....',
        '.....',
        '..#..',
        '.....',
        '.....'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });

    it([
      `should leave this layout to remain unchanged:`,
      '          .....',
      '          ..#..',
      '          ..L..',
      '          .....',
      '          .....'
    ].join('\n'), () => {
      const testInput = [
        '.....',
        '..#..',
        '..L..',
        '.....',
        '.....'
      ].map(processLine);
      const solution = evolvePart2(testInput).toString();
      const expected = [
        '.....',
        '..#..',
        '..L..',
        '.....',
        '.....'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });

    it([
      `should leave this layout unchanged:`,
      '          ..#..',
      '          .....',
      '          #.#.#',
      '          .....',
      '          ..#.L'
    ].join('\n'), () => {
      const testInput = [
        '..#..',
        '.....',
        '#.#.#',
        '.....',
        '..#.L'
      ].map(processLine);
      const solution = evolvePart2(testInput).toString();
      const expected = [
        '..#..',
        '.....',
        '#.#.#',
        '.....',
        '..#.L'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });

    it([
      `should make the middle seat unoccupied:`,
      '          ..#..',
      '          .....',
      '          #.#.#',
      '          .....',
      '          ..#.#'
    ].join('\n'), () => {
      const testInput = [
        '..#..',
        '.....',
        '#.#.#',
        '.....',
        '..#.#'
      ].map(processLine);
      const solution = evolvePart2(testInput).toString();
      const expected = [
        '..#..',
        '.....',
        '#.L.#',
        '.....',
        '..#.#'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });

    // Given example
    it([
      `should lead the following plan after 1 interation:`,
      '         #.##.##.##',
      '         #######.##',
      '         #.#.#..#..',
      '         ####.##.##',
      '         #.##.##.##',
      '         #.#####.##',
      '         ..#.#.....',
      '         ##########',
      '         #.######.#',
      '         #.#####.##'
    ].join('\n'), () => {
      const solution = evolvePart2(example).toString();
      const expected = [
        '#.##.##.##',
        '#######.##',
        '#.#.#..#..',
        '####.##.##',
        '#.##.##.##',
        '#.#####.##',
        '..#.#.....',
        '##########',
        '#.######.#',
        '#.#####.##'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });
  
    it([
      `should lead the following plan after 2 interation:`,
      '         #.LL.LL.L#',
      '         #LLLLLL.LL',
      '         L.L.L..L..',
      '         LLLL.LL.LL',
      '         L.LL.LL.LL',
      '         L.LLLLL.LL',
      '         ..L.L.....',
      '         LLLLLLLLL#',
      '         #.LLLLLL.L',
      '         #.LLLLL.L#'
    ].join('\n'), () => {
      const solution = evolvePart2(example, 2).toString();
      const expected = [
        '#.LL.LL.L#',
        '#LLLLLL.LL',
        'L.L.L..L..',
        'LLLL.LL.LL',
        'L.LL.LL.LL',
        'L.LLLLL.LL',
        '..L.L.....',
        'LLLLLLLLL#',
        '#.LLLLLL.L',
        '#.LLLLL.L#'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });
  
    it([
      `should lead the following plan after 3 interation:`,
      '         #.L#.##.L#',
      '         #L#####.LL',
      '         L.#.#..#..',
      '         ##L#.##.##',
      '         #.##.#L.##',
      '         #.#####.#L',
      '         ..#.#.....',
      '         LLL####LL#',
      '         #.L#####.L',
      '         #.L####.L#'
    ].join('\n'), () => {
      const solution = evolvePart2(example, 3).toString();
      const expected = [
        '#.L#.##.L#',
        '#L#####.LL',
        'L.#.#..#..',
        '##L#.##.##',
        '#.##.#L.##',
        '#.#####.#L',
        '..#.#.....',
        'LLL####LL#',
        '#.L#####.L',
        '#.L####.L#'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });
  
    it([
      `should lead the following plan after 4 interation:`,
      '         #.L#.L#.L#',
      '         #LLLLLL.LL',
      '         L.L.L..#..',
      '         ##LL.LL.L#',
      '         L.LL.LL.L#',
      '         #.LLLLL.LL',
      '         ..L.L.....',
      '         LLLLLLLLL#',
      '         #.LLLLL#.L',
      '         #.L#LL#.L#'
    ].join('\n'), () => {
      const solution = evolvePart2(example, 4).toString();
      const expected = [
        '#.L#.L#.L#',
        '#LLLLLL.LL',
        'L.L.L..#..',
        '##LL.LL.L#',
        'L.LL.LL.L#',
        '#.LLLLL.LL',
        '..L.L.....',
        'LLLLLLLLL#',
        '#.LLLLL#.L',
        '#.L#LL#.L#'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });
  
    it([
      `should lead the following plan after 5 interation:`,
      '         #.L#.L#.L#',
      '         #LLLLLL.LL',
      '         L.L.L..#..',
      '         ##L#.#L.L#',
      '         L.L#.#L.L#',
      '         #.L####.LL',
      '         ..#.#.....',
      '         LLL###LLL#',
      '         #.LLLLL#.L',
      '         #.L#LL#.L#'
    ].join('\n'), () => {
      const solution = evolvePart2(example, 5).toString();
      const expected = [
        '#.L#.L#.L#',
        '#LLLLLL.LL',
        'L.L.L..#..',
        '##L#.#L.L#',
        'L.L#.#L.L#',
        '#.L####.LL',
        '..#.#.....',
        'LLL###LLL#',
        '#.LLLLL#.L',
        '#.L#LL#.L#'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });
  
    it([
      `should lead the following plan after 6 interation:`,
      '         #.L#.L#.L#',
      '         #LLLLLL.LL',
      '         L.L.L..#..',
      '         ##L#.#L.L#',
      '         L.L#.LL.L#',
      '         #.LLLL#.LL',
      '         ..#.L.....',
      '         LLL###LLL#',
      '         #.LLLLL#.L',
      '         #.L#LL#.L#'
    ].join('\n'), () => {
      const solution = evolvePart2(example, 6).toString();
      const expected = [
        '#.L#.L#.L#',
        '#LLLLLL.LL',
        'L.L.L..#..',
        '##L#.#L.L#',
        'L.L#.LL.L#',
        '#.LLLL#.LL',
        '..#.L.....',
        'LLL###LLL#',
        '#.LLLLL#.L',
        '#.L#LL#.L#'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });
  
    it([
      `should lead the following plan after 10 interation:`,
      '         #.L#.L#.L#',
      '         #LLLLLL.LL',
      '         L.L.L..#..',
      '         ##L#.#L.L#',
      '         L.L#.LL.L#',
      '         #.LLLL#.LL',
      '         ..#.L.....',
      '         LLL###LLL#',
      '         #.LLLLL#.L',
      '         #.L#LL#.L#'
    ].join('\n'), () => {
      const solution = evolvePart2(example, 10).toString();
      const expected = [
        '#.L#.L#.L#',
        '#LLLLLL.LL',
        'L.L.L..#..',
        '##L#.#L.L#',
        'L.L#.LL.L#',
        '#.LLLL#.LL',
        '..#.L.....',
        'LLL###LLL#',
        '#.LLLLL#.L',
        '#.L#LL#.L#'
      ].map(processLine).toString();
      
      assert.strictEqual(solution, expected);
    });
  });
});

// ===============
// == Functions ==
// ===============
