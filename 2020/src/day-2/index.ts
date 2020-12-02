import * as fs from 'fs';
import * as path from 'path';

import { green } from '../utilities';


interface Entry {
  min: number;
  max: number;
  letter: string;
  password: string;
}

export function solver(input: Entry[]) {
  for (const entry of input) {
    const { min, max, letter, password } = entry;

    if (min > max) {
      throw Error('An entry with `min` > `max` was provided!');
    }
  }

  return -1;
}