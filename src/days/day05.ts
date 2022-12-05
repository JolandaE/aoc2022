import { getFileReader } from "../helpers/filehelpers";
import { cloneDeep } from "lodash";

type MoveSet = {
    amount: number,
    moveFrom: number,
    moveTo: number
}

const initialData: string[][] = [];
const movesets: MoveSet[] = [];

function getMoveSet(coords: number[]) {
    return {
        amount: coords[0],
        moveFrom: coords[1],
        moveTo: coords[2]
    }
}

function moveCrates(grid: string[][], isCrateMover9000: boolean): string[][] {
    const crateGrid = cloneDeep(grid);

    movesets.forEach(set => {
        let cratesToMove = crateGrid[set.moveFrom-1].splice(0, set.amount)

        if (isCrateMover9000) {
            cratesToMove = cratesToMove.reverse();
        }

        crateGrid[set.moveTo-1] = cratesToMove.concat(crateGrid[set.moveTo-1]);
    });
    return crateGrid;
}

export function AoCDayFive(){
    // npx tsc -w
    const reader = getFileReader('input/day05_1.txt');

    reader.on('line', (line) => {
        if(line.startsWith("move")) {
            const coords: number[] = line.split(' ').filter(a => parseInt(a)).map(a => parseInt(a));
            movesets.push(getMoveSet(coords));
        } else {
                // Two ways to identify a stack: four spaces or single space 
                initialData.push(
                    line.split(/\s\s\s\s|\s/).map(index => 
                    //remove unnecessary characters
                    index.trim().replace(/\[|\]/g, '')
                ).filter(a => !parseInt(a)))
        }
    });

    reader.on('close', () => {
        const crateStacks: string[][] = [];

        // Push each box to the respective stack.
        initialData.forEach(grid => {
            for(let index=0; index<grid.length; index++){

                // If no stack exists yet, create one before pushing to it.
                if(!crateStacks[index]) {
                    crateStacks[index] = [];
                }

                // We only want to push boxes
                if(grid[index] !== '') { 
                    crateStacks[index].push(grid[index])
                }
            }  
        }); 

        const movedCratesPartOne = moveCrates(crateStacks, true);
        const movedCratesPartTwo = moveCrates(crateStacks, false);

        // Get the top box from each stack
        console.log(`Part 1 outcome:`,  movedCratesPartOne.map(grid => grid[0]).join(''));
        console.log(`Part 2 outcome:`,  movedCratesPartTwo.map(grid => grid[0]).join(''));
    })
};