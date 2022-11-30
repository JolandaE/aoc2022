"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filehelpers_1 = require("./helpers/filehelpers");
// npx tsc -w
const reader = (0, filehelpers_1.getFileReader)('src/helpers/test.txt');
reader.on('line', (line) => {
    // do stuff per line here
});
reader.on('close', () => {
    // do clean up stuff here
});
//# sourceMappingURL=index.js.map