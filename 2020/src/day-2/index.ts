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
  let numValidPasswords = 0;

  for (const entry of input) {
    const { min, max, letter, password } = entry;

    if (min > max) {
      throw Error('An entry with `min` > `max` was provided!');
    }

    const re = new RegExp(letter, 'g');
    const matched = password.match(re);
    const numLettersFound = matched ? matched.length : 0;
    const isValidPassword = numLettersFound >= min
      && numLettersFound <= max;

    if (
      numLettersFound >= min
      && numLettersFound <= max
    ) {
      numValidPasswords += 1;
    }
  }

  return numValidPasswords;
}