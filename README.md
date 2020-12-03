# Advent of Code

This repository contains my solutions for [Advent of Code](https://adventofcode.com). The solutions are here just to satisify my inner collectionist, satiate my need for writing documentation, and so that I can come back years later to remind myself of the terrible algorithms that I used to write when I'm suffering from an episode of [imposter syndrome](https://en.wikipedia.org/wiki/Impostor_syndrome).


## Table of Contents

* [Installation](#installation)
* [Running and Testing](#runing-and-testing)
  * [Running a Single File](#running-a-single-file)
  * [Getting Solutions from a File](#getting-solutions-from-a-file)
  * [Testing a Single File](#testing-a-single-file)
  * [Teseting by year](#testing-by-year)
* [Solutions](#solutions)
  * [Advent of Code 2020](#advent-of-code-2020)


## Installation

The solutions are written in [TypeScript](https://www.typescriptlang.org/) under a [Node.js](https://nodejs.org) environment. Once the repository is cloned, installation can be done using either the [NPM](https://www.npmjs.com) or [Yarn](https://yarnpkg.com) package manager.

```sh
# Clone the repoisotry
git clone https://github.com/honmanyau/advent-of-code

# Change to the cloned directory
cd advent-of-code

# Install the required dependencies with NPM
npm install

# Install the required dependencies with Yarn
yarn install
```


## Running and Testing

The [Mocha](https://mochajs.org) test framework is used to write the tests in this repository. A few primitive shell scripts are set up in [`package.json`](./package.json) for excuting tests.

### Running a Single File

```sh
npm run ts-node -- "$(pwd)/path-to-file/filename.ts"
yarn run ts-node -- "$(pwd)/path-to-file/filename.ts"
```

### Getting Solutions from a File

The code that outpus the solutions contained in each challenge's `index.ts` file only runs when the `SOLVE` environment variable is set to `true`. The environment variable can be specified when running the `ts-node` script:

```sh
SOLVE=true npm run ts-node -- "$(pwd)/path-to-file/index.ts"
SOLVE=true yarn run ts-node -- "$(pwd)/path-to-file/index.ts"
```

Alternatively, one can also use the `solve` script:

```sh
npm run solve -- "$(pwd)/path-to-file/index.ts"
yarn run solve -- "$(pwd)/path-to-file/index.ts"
```


### Testing a Single File

```sh
npm run test -- "$(pwd)/path-to-file/test.ts"
yarn run test -- "$(pwd)/path-to-file/test.ts"
```

### Testing by Year

```sh
npm run test:2020
yarn test:2020
```


## Solutions

<details>
    <summary>
      <a href="./2020">Advent of Code 2020</a>
    </summary>
    <ul>
      <li><a href="./2020/src/day-1">Day 1: Report Repair</a></li>
      <li><a href="./2020/src/day-2">Day 2: Password Philosophy</a></li>
    </ul>
</details>
