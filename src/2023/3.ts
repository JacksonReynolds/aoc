/*
--- Day 3: Gear Ratios ---

You and the Elf eventually reach a gondola lift station; he says the gondola lift
will take you up to the water source, but this is as far as he can bring you.
You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem:
they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of
surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working
right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine,
but nobody can figure out which one. If you can add up all the part numbers in
the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of
the engine. There are lots of numbers and symbols you don't really understand,
but apparently any number adjacent to a symbol, even diagonally, is a "part
number" and should be included in your sum. (Periods (.) do not count as a
symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..

--- Part One ---

In this schematic, two numbers are not part numbers because they are not
adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number
is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all
of the part numbers in the engine schematic?

*/

import { readRaw } from "../utils/read";

const raw = readRaw("3").replace(/\n/g, ";");

const test = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

const partOne = (data = raw) => {
  data = data.replace(/\r?\n/g, ";");
  const allSymbols = data.match(/[^0-9.;]/g) ?? [];
  const lineLength = data.indexOf(";") + 1;
  // match the numbers
  const numbers = (data.match(/[0-9]+/g) ?? []).map((str) => +str);
  let sum = 0;
  for (const num of numbers) {
    const left = data.indexOf(num.toString());
    const right = left + num.toString().length;
    const surroundingChars =
      data.substring(left - 1 - lineLength, right + 1 - lineLength) +
      data.substring(left - 1, right + 1) +
      data.substring(left - 1 + lineLength, right + 1 + lineLength);
    if (allSymbols?.some((sym) => surroundingChars.includes(sym))) {
      sum += num;
    }
    data =
      data.substring(0, left) +
      ".".repeat(num.toString().length) +
      data.substring(right);
  }
  return sum;
};

const partTwo = (data = raw) => {
  data = data.replace(/\r?\n/g, ";");
  const lineLength = data.indexOf(";") + 1;
  const numbers = (data.match(/[0-9]+/g) ?? []).map((str) => +str);

  const gears = new Map<number, number[]>();
  for (const num of numbers) {
    // for each index that corresponds to a char adjacent to num
    // check if it is a gear (asterisk)
    // if so either add it as a new entry to gears
    // or add it to the existing entry
    const left = data.indexOf(num.toString());
    const right = left + num.toString().length;

    // find gears in adjacent chars above
    for (let i = left - 1 - lineLength; i < right + 1 - lineLength; i++) {
      if (data[i] === "*") {
        gears.get(i) ? gears.get(i)?.push(num) : gears.set(i, [num]);
      }
    }
    // find gears in adjacent chars
    for (let i = left - 1; i < right + 1; i++) {
      if (data[i] === "*") {
        gears.get(i) ? gears.get(i)?.push(num) : gears.set(i, [num]);
      }
    }
    // find gears in adjacent chars below
    for (let i = left - 1 + lineLength; i < right + 1 + lineLength; i++) {
      if (data[i] === "*") {
        gears.get(i) ? gears.get(i)?.push(num) : gears.set(i, [num]);
      }
    }
    data =
      data.substring(0, left) +
      ".".repeat(num.toString().length) +
      data.substring(right);
  }

  // find all entries with exactly two corresponding numbers
  // sum the products of those numbers
  return Array.from(gears.values())
    .filter((nums) => nums.length === 2)
    .reduce<number>((sum, [a, b]) => {
      return sum + a * b;
    }, 0);
};

console.log("Part One: ", partOne());
console.log("part Two: ", partTwo());
