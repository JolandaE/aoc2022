import { getFileReader } from "../helpers/filehelpers";

type Monkey = {
    monkeyId: number;
    items: number[],
    operation: Function,
    testByDivision: number,
    throwOnTestSucceed: number,
    throwOnTestFail: number
}

function getNewMonkey(): Monkey {
    return {
        monkeyId: -1,
        items: [],
        operation: () => {},
        testByDivision: -1,
        throwOnTestSucceed: -1,
        throwOnTestFail: -1
    }
}

function parseLine(line: string, monkey: Monkey): Monkey{
    const command = line.trim().split(':')[0];
    const exec = line.trim().split(':')[1].trim();

    if (command.startsWith('Monkey')){
        monkey.monkeyId = parseInt(command.split(' ')[1]);
    }
    else if(command.startsWith('Starting items')){
        monkey.items = exec.split(',').map(value => parseInt(value));
    } else if(command.startsWith('Operation')) {
        // new = old [something] [value]
        const values = exec.split(' ');
        const number = parseInt(values[4]);

        if (values[3] === '*'){
            if (isNaN(number))
                monkey.operation = (old: number) => { return old * old }
            else {
                monkey.operation = (old: number) => { return old * number }
            }
        } else if (values[3] === '+') {
            if (isNaN(number))
                monkey.operation = (old: number) => { return old + old }
            else {
                monkey.operation = (old: number) => { return old + number }
            }
        } else {
            console.log('Not + or *');
        }
    } else if (command.startsWith('Test')){
        // divisible by X
        monkey.testByDivision = parseInt(exec.split(' ')[2]);
    } else if (command.startsWith('If')){
        const nextMonkey = parseInt(exec.split(' ')[3]);
        command.includes('true') ? monkey.throwOnTestSucceed = nextMonkey : monkey.throwOnTestFail = nextMonkey;
    }
    return monkey;
}

/**
 * 
 * @param cItem current item to be inspected
 * @param monkey The monkey inspecting the item
 * @param modulo modulo to divide the product of the inspection by. If null, division will be 3.
 */
function inspectItem(cItem: number | undefined, monkey: Monkey, modulo: number | null) {
    if (cItem){
        let item = monkey.operation(cItem);

        modulo ? item %= modulo : item = Math.floor(item / 3);

        if (item % monkey.testByDivision === 0) {
            allMonkeys[monkey.throwOnTestSucceed].items.push(item);
        } else {
            allMonkeys[monkey.throwOnTestFail].items.push(item);
        }
    }
}

const allMonkeys: Monkey[] = [];
let currentMonkey: Monkey = getNewMonkey();

export function AoCDayEleven() {
    const reader = getFileReader('input/day11_1.txt');

    reader.on('line', (line) => {
        if(line.length){
            currentMonkey = parseLine(line, currentMonkey);
        
            if(line.trim().startsWith('If false')) {
                allMonkeys.push(currentMonkey);
                currentMonkey = getNewMonkey();
            }
        }
    });

    const inspectedItemsPerMonkeyPartOne: number[] = [];
    const inspectedItemsPerMonkeyPartTwo: number[] = [];

    reader.on('close', () => {
        // To deal with integer overflow, take the product of all division as common modulo to divide the worry level by
        let modulo = 1;
        allMonkeys.forEach(monkey => {
            inspectedItemsPerMonkeyPartOne.push(0);
            inspectedItemsPerMonkeyPartTwo.push(0);
            modulo *= monkey.testByDivision;
        });

        const roundsPartOne = 20;
        const roundsPartTwo = 10000;

        for (let i = 0; i<roundsPartOne; i++){
            allMonkeys.forEach(monkey => {
                const items: number = monkey.items.length;
                inspectedItemsPerMonkeyPartOne[monkey.monkeyId] += items;
                for (let j=0; j<items; j++) {
                    inspectItem(monkey.items.shift(), monkey, null);
                }
            });
        }

        for (let i = 0; i<roundsPartTwo; i++){
            allMonkeys.forEach(monkey => {
                const items: number = monkey.items.length;
                inspectedItemsPerMonkeyPartTwo[monkey.monkeyId] += items;
                for (let j=0; j<items; j++) {
                    inspectItem(monkey.items.shift(), monkey, modulo);
                }
            });
        }

        inspectedItemsPerMonkeyPartOne.sort((a,b) => b-a);
        inspectedItemsPerMonkeyPartTwo.sort((a,b) => b-a);
        console.log(`[DAY 11 PART 1]: `, inspectedItemsPerMonkeyPartOne[0]*inspectedItemsPerMonkeyPartOne[1]);
        console.log(`[DAY 11 PART 2]: `, inspectedItemsPerMonkeyPartTwo[0]*inspectedItemsPerMonkeyPartTwo[1]);
    });
}