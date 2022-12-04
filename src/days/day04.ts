import { getFileReader } from "../helpers/filehelpers";

// npx tsc -w
const reader = getFileReader('input/day04_1.txt');
const START = 0;
const END = 1;

function hasTotalOverlap(first: number[], second: number[]): boolean {
    return ((first[START] <= second[START] && second[END] <= first[END]) ||
            (second[START] <= first[START] && first[END] <= second[END])) 
}

function hasPartialOverlap(first: number[], second: number[]): boolean {
    // the end of one pair should be equal or higher than either number in the other pair.
    return ((second[START] <=  first[END] &&  first[END] <= second[END]) || 
            ( first[START] <= second[END] && second[END] <=  first[END]))
}


export function AoCDayFour() {
    let totalOverlapPairs = 0;
    let partialOverlapPairs = 0;

    reader.on('line', (line: string) => {
        const ranges: number[] = line.split(/[-,]+/).filter(a => parseInt(a)).map(a => parseInt(a));
    
        if (hasTotalOverlap(ranges.slice(0,2), ranges.slice(2))) {
            totalOverlapPairs += 1;
        }
    
        if (hasPartialOverlap(ranges.slice(0,2), ranges.slice(2))) {
            partialOverlapPairs += 1;
        }
    })
    
    reader.on('close', () => {
        console.log(`[DAY 4, PART 1] pairs with total overlap: ${totalOverlapPairs}`);
        console.log(`[DAY 4, PART 2] pairs with partial overlap: ${partialOverlapPairs}\n`);
    })
}