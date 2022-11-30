import { getFileReader } from "./helpers/filehelpers";

// npx tsc -w
const reader = getFileReader('src/helpers/test.txt');

reader.on('line', (line) => {
    // do stuff per line here
})

reader.on('close', () => {
    // do clean up stuff here
})