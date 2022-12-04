import { getFileReader } from "../helpers/filehelpers";

// npx tsc -w
const reader = getFileReader('input/day04_1.txt');
const START = 0;
const END = 1;

function totalOverlap(left: number[], right: number[]): boolean {
    return ((left[START] <= right[START] && right[END] <= left[END]) ||
            (right[START] <= left[START] && left[END] <= right[END])) 
}

function partialOverlap(left: number[], right: number[]): boolean {
    // the end of one pair should be equal or higher than either number in the other pair.
    return ((right[START] <=  left[END] &&  left[END] <= right[END]) || 
            ( left[START] <= right[END] && right[END] <=  left[END]))
}


export function AoCDayFour() {
    let totalOverlapPairs = 0;
    let partialOverlapPairs = 0;

    reader.on('line', (line: string) => {
        const bounds: number[] = line.split(/[-,]+/).filter(a => parseInt(a)).map(a => parseInt(a));
    
        if (totalOverlap(bounds.slice(0,2), bounds.slice(2))) {
            totalOverlapPairs += 1;
        }
    
        if (partialOverlap(bounds.slice(0,2), bounds.slice(2))) {
            partialOverlapPairs += 1;
        }
    })
    
    reader.on('close', () => {
        console.log(`[DAY 4, PART 1] pairs with total overlap: ${totalOverlapPairs}`);
        console.log(`[DAY 4, PART 2] pairs with partial overlap: ${partialOverlapPairs}\n`);
    })
}