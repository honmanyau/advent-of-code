/**
 * This function formats a string with the ANSI escape code for printing a
 * green (colour 32) string.
 * @param {string} input - The input to be formatted with a green colour.
 * @returns {string} A string that is colour-formatted for the console.
 */
export function green(input: any) {
  const text = input.toString();
  
  return '\x1b[32m' + text + '\x1b[0m';
}

/**
 * This fucntion times the amount it takes for the provided callback function
 * to execute, and prints the duration in milliseconds to the console. All
 * operations in the callback function are assumed to be synchronous.
 * @param {function} callback The callback function to be timed.
 */
export function logDuration(name: string, callback: () => void) {
  const start = process.hrtime.bigint();
  const result = callback();
  const end = process.hrtime.bigint();
  const elapsedMs = Number(end - start) / 1E6;

  console.log(`${name} finished in ${green(elapsedMs)} ms.\n`);

  return result;
}

/**
 * This function formats a string with the ANSI escape code for printing a
 * red (colour 31) string.
 * @param {string} input - The input to be formatted with a red colour.
 * @returns {string} A string that is colour-formatted for the console.
 */
export function red(input: any) {
  const text = input.toString();
  
  return '\x1b[31m' + text + '\x1b[0m';
}

/**
 * This function formats a string with the ANSI escape code for printing a
 * yellow (colour 33) string.
 * @param {string} input - The input to be formatted with a yellow colour.
 * @returns {string} A string that is colour-formatted for the console.
 */
export function yellow(input: any) {
  const text = input.toString();
  
  return '\x1b[33m' + text + '\x1b[0m';
}
