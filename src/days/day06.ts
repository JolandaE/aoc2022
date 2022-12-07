import { getFileReader } from "../helpers/filehelpers";

function isUniqueString(input: string): boolean { 
    const setOfCharacters = new Set([...input]);
    return setOfCharacters.size === input.length;
}

function findFirstOccurence(line: string, messageLength: number){
    let firstIndex = 0;
    for(let i=0; i<line.length; i++) {
        if(isUniqueString(line.slice(i, i+messageLength))) {
           firstIndex = i+messageLength;
           break;
        }
    }
    return firstIndex;
}

function solvePartOne(){
    const reader = getFileReader('input/day06_1.txt');
    let messageStart = 0;
    reader.on('line', (line) => {
        messageStart = findFirstOccurence(line, 4);
    });

    reader.on('close', () => {
        console.log('[DAY 6, PART 1]: ', messageStart);
    });
}

function solvePartTwo(){
    const reader = getFileReader('input/day06_1.txt');
    let messageStart = 0;
    reader.on('line', (line) => {
        messageStart = findFirstOccurence(line, 14);
    });

    reader.on('close', () => {
        console.log('[DAY 6, PART 2]: ', messageStart);
    });
}

export function AoCDaySix() {
    solvePartOne();
    solvePartTwo();
}