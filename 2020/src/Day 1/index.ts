export function solve(input: number[]) {
  for (let i = 0; i < input.length; i++) {
    const currentValue = input[i];
    const difference = 2020 - currentValue;
    const indexOfDifference = input.indexOf(difference);

    if (
      indexOfDifference !== -1
      && indexOfDifference !== i
    ) {
      return currentValue * difference;
    }
  }

  throw Error('There are no pairs that sum up to 2020 in the input!');
}