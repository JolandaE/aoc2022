import { getFileReader } from "../helpers/filehelpers";
import { cloneDeep } from "lodash";

function moveHead(head: number[], direction: string): number[] {
    const newHead: number[] = cloneDeep(head);
    switch(direction){
        case 'U': newHead[0]++; break;
        case 'D': newHead[0]--; break;
        case 'L': newHead[1]--; break;
        case 'R': newHead[1]++; break;
        default: console.log('Weird value');
    }
    return newHead;
}

function shouldMoveTail(head: number[], tail: number[]): boolean {
    return !((tail[0]-1 <= head[0] && head[0] <= tail[0]+1) && (tail[1]-1 <= head[1] && head[1] <= tail[1]+1));
}

function moveTail(head: number[], tail: number[]): number[] {
    const xDiff = head[0] - tail[0];
    const yDiff = head[1] - tail[1];

    let moveX = 0;
    let moveY = 0;

    // take care of the diagonals
    if (xDiff === 2) { 
        moveX = 1;
        moveY = [-1,1].includes(moveY) ? moveY : yDiff;
    } else if (xDiff === -2) {
        moveX = -1
        moveY = [-1,1].includes(moveY) ? moveY : yDiff;
    }

    if (yDiff === 2) {
        moveY = 1;
        moveX = [-1,1].includes(moveX) ? moveX : xDiff;
    } else if (yDiff === -2) {
        moveY = -1;
        moveX = [-1,1].includes(moveX) ? moveX : xDiff;
    } 

    return [tail[0]+moveX, tail[1]+moveY];
}

function partOne(){
    const reader = getFileReader('input/day09_1.txt');
    let currentHead = [0,0];
    let currentTail = [0,0];
    let uniqueTails: Set<string> = new Set();
    uniqueTails.add(currentTail.join('&'));

    reader.on('line', (line) => {
        const direction = line.split(' ')[0];
        const amount = parseInt(line.split(' ')[1]);
        for (let i=0; i<amount; i++){
            const newHead: number[] = moveHead(currentHead, direction);

            if (shouldMoveTail(newHead, currentTail)){
                currentTail = currentHead;
                uniqueTails.add(currentTail.join('&'));
            }
            currentHead = newHead;
        };
    });
    reader.on('close', () => {
        console.log('[DAY 9, PART 1]: ', uniqueTails.size);
    });
}

function partTwo(){
    const reader = getFileReader('input/day09_1.txt');
    let longerRope: number[][] = [];
    let ropeLength = 10;

    for (let i =0; i<ropeLength; i++){
        longerRope.push([0,0])
    }

    let currentTail = [0,0];
    let uniqueTails: Set<string> = new Set();
    uniqueTails.add(currentTail.join('&'));

    reader.on('line', (line) => {
        const direction = line.split(' ')[0];
        const amount = parseInt(line.split(' ')[1]);
    
        for (let i=0; i<amount; i++){
           const newRope = [];
           newRope.push(moveHead(longerRope[0], direction));
           
           let oldTailValue: number[] = [];
    
           for(let j=1; j<longerRope.length; j++){
                const newHead: number[] = newRope[j-1];
                oldTailValue = cloneDeep(longerRope[j]);
    
                newRope.push(moveTail(newHead, oldTailValue))
           }
           longerRope = newRope;
           uniqueTails.add(longerRope[9].join('&'));
        }
    });
    
    
    reader.on('close', () => {
        console.log('[DAY 9, PART 2]: ', uniqueTails.size);
    });
}

export function AoCDayNine(){
    partOne();
    partTwo();
}