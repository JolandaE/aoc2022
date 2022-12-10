
import { getFileReader } from "../helpers/filehelpers";

let xValue = 1;
let cycle = 1;
let signalValues = 0;

const countValueOn = [20, 60, 100, 140, 180, 220];
const pixelGrid: string[][] = [[], [], [], [], [], []];

function drawPixel(){
    const index = cycle % 40;
    const row = Math.floor((cycle-1)/40);

    if (index >= xValue && index <= xValue+2) {
        pixelGrid[row].push('#');
    } else {
        pixelGrid[row].push('.');
    }
}

function addCycle(countCycle: number[]): void{
    cycle++;
    if (countCycle.includes(cycle)) {
        signalValues += cycle * xValue;
    }
}

export function AoCDayTen() {
    const reader = getFileReader('input/day10_1.txt');
    reader.on('line', (line) => {
        if (line === 'noop') {
            drawPixel();
            addCycle(countValueOn);
        } else if (line.startsWith('addx')) {
            const value: number = parseInt(line.split(' ')[1]);
            drawPixel();
            addCycle(countValueOn);
            drawPixel();
            xValue += value;
            addCycle(countValueOn); 
        }
    });


    reader.on('close', () => {
        console.log('[DAY 10, PART 1]: ', signalValues);
        console.log('[DAY 10, PART 2')
        pixelGrid.forEach(row => console.log(row.join('')))
    });
}