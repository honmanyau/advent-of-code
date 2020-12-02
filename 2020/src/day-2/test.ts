import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';
import { solver } from './index';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = exampleFile.trim().split('\n').map(processLine);

describe('Day 2: Password Philosophy', () => {
  it([
    `should identify ${yellow(2)} valid passwords in the example input`
  ].join(''), () => {
    const solution = solver(example);

    assert.strictEqual(solution, 2);
  });

  it([
    `should identify ${yellow(2)} valid passwords in the example input if the`,
    ' second entry is removed.'
  ].join(''), () => {
    const modifiedExample = [ ...example ].filter((_v, i) => i !== 1);
    const solution = solver(modifiedExample);

    assert.strictEqual(solution, 2);
  });

  it([
    `should identify ${yellow(1)} valid passwords in the example input if the`,
    ' first entry is removed.'
  ].join(''), () => {
    const modifiedExample = [ ...example ].filter((_v, i) => i !== 0);
    const solution = solver(modifiedExample);

    assert.strictEqual(solution, 1);
  });

  it([
    `should identify ${yellow(1)} valid passwords in the example input if the`,
    ' last entry is removed.'
  ].join(''), () => {
    const modifiedExample = [ ...example ].filter((_v, i) => i !== 2);
    const solution = solver(modifiedExample);

    assert.strictEqual(solution, 1);
  });

  it([
    `should identify ${yellow(0)} valid passwords in the example input if the`,
    ' first and last last entry are removed.'
  ].join(''), () => {
    const modifiedExample = [ ...example ].filter((_v, i) => i === 1);
    const solution = solver(modifiedExample);

    assert.strictEqual(solution, 0);
  });

  it([
    `should throw an error if value of the \`max\` property of an entry`,
    ` is less than the value of the \`min\` property.`
  ].join(''), () => {
    const testInput = [
      { min: 2, max: 1, letter: 'a', password: 'abcde' }
    ];

    assert.throws(() => solver(testInput), Error);
  });
});

function processLine(line: string) {
  const [ range, letter, password ] = line.replace(':', '').split(' ');
  const [ min, max ] = range.split('-').map(Number);

  return { min, max, letter, password };
}