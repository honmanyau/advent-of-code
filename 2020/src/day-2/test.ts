import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { yellow } from '../utilities';


const examplePathname = path.resolve(__dirname, './example.txt');
const exampleFile = fs.readFileSync(examplePathname, 'utf-8');
const example = exampleFile.trim().split('\n').map(processLine);

describe('Day 2: Password Philosophy', () => {
  it([].join(''), () => {
    console.log(example);
  });
});

function processLine(line: string) {
  const [ range, letter, password ] = line.replace(':', '').split(' ');
  const [ min, max ] = range.split('-').map(Number);

  return { min, max, letter, password };
}