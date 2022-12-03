import { getFileReader } from "../helpers/filehelpers";

const priorityMap: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// The total priority score of the items in a compartment (part 1)
let totalPriorityScore = 0;
// The total priority score of an elf badge (part 2)
let elfBadgePriority = 0;

function getPriority(input: string): number {
    return priorityMap.indexOf(input) + 1;
} 

function findItemInRucksack(rucksack: string) {
    const splitOn = rucksack.length / 2;
    const firstCompartment = rucksack.slice(0, splitOn);
    const secondCompartment = rucksack.slice(splitOn);

    for(let item = 0; item < firstCompartment.length; item++){
        if (secondCompartment.includes(firstCompartment[item])) {
            totalPriorityScore += getPriority(firstCompartment[item]);
            break;
        }
    };
}


function findCommonItemInGroup(elfGroup: string[]) {
    elfGroup.sort((a, b) => a.length - b.length);
    const smallestRuckSackValues = [...elfGroup[0]];
    
    for(let item = 0; item < smallestRuckSackValues.length; item++) {
        if (elfGroup[1].includes(smallestRuckSackValues[item]) && elfGroup[2].includes(smallestRuckSackValues[item])) {
            elfBadgePriority += getPriority(smallestRuckSackValues[item]);
            break;
        }
    }
}

function solvePartOne(){
    const reader = getFileReader('input/day03_1.txt');
    reader.on('line', (rucksack) => {
        findItemInRucksack(rucksack);
    })
    
    reader.on('close', () => {
       console.log(`[DAY 3, PART 1] Priority score per rucksack: ${totalPriorityScore}`);
    })
}

function solvePartTwo(){
    const reader = getFileReader('input/day03_1.txt');
    const groupsOfElves: string[][] = [];
    
    let index = 0;
    let elfGroup: string[] = [];

    reader.on('line', (elf) => {
        elfGroup.push(elf);
        index++;
    
        if (index == 3) {
            groupsOfElves.push(elfGroup);
            elfGroup = [];
            index = 0;
        }
    })
    
    reader.on('close', () => {
        groupsOfElves.forEach(group =>
            findCommonItemInGroup(group)
        )
        
       console.log(`[DAY 3, PART 2] Priority score per elf group: ${elfBadgePriority}\n`);
    })
}

export function AoCDayThree() {
    solvePartOne();
    solvePartTwo();
}