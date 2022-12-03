import { getFileReader } from "../helpers/filehelpers";

// LOSE: 0pt, DRAW: 3pt, WIN: 6pt
// X = 1, Y = 2, Z = 3
const points: Record<string, number> = {
    // DRAW
    'A X' : 4, 
    'B Y' : 5, 
    'C Z' : 6,
    
    // WIN
    'A Y' : 8,
    'B Z' : 9,
    'C X' : 7,
    
    // LOSE
    'A Z' : 3,
    'B X' : 1,
    'C Y' : 2,
};

// X should map to lose, Y should map to draw, Z should map to win
const pointsWithStrategy: Record<string, number> = {
    'A X' : points['A Z'],
    'B X' : points['B X'],
    'C X' : points['C Y'],
    
    'A Y' : points['A X'],
    'B Y' : points['B Y'],
    'C Y' : points['C Z'],
    
    'A Z' : points['A Y'],
    'B Z' : points['B Z'],
    'C Z' : points['C X'],
};

async function solvePartOne(){
    const reader = getFileReader('input/day02_1.txt');
    let sum = 0;
    reader.on('line', (line: string) => {
        sum += points[line.trim()];
    })
    
    reader.on('close', () => {
       console.log(`[DAY 2, PART 1] Points without strategy: ${sum}`);
    })
}

function solvePartTwo(){
    const reader = getFileReader('input/day02_1.txt');
    let sum = 0;
    reader.on('line', (line: string) => {
        sum += pointsWithStrategy[line.trim()];
    })
    
    reader.on('close', () => {
       console.log(`[DAY 2, PART 2] Points with strategy: ${sum}\n`);
    })
}

export function AoCDayTwo() {
    solvePartOne();
    solvePartTwo();
}
