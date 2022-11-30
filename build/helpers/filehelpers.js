"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileReader = void 0;
const fs_1 = require("fs");
const readline_1 = require("readline");
function getFileReader(filePath) {
    return (0, readline_1.createInterface)({
        input: (0, fs_1.createReadStream)(filePath)
    });
}
exports.getFileReader = getFileReader;
//# sourceMappingURL=filehelpers.js.map