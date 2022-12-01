import { getFileReader } from "./helpers/filehelpers";

// npx tsc -w
const reader = getFileReader('input/day01_1.txt');

reader.on('line', (line) => {
    // do stuff per line here
})

reader.on('close', () => {
   // do stuff on close here
})