import { getFileReader } from "../helpers/filehelpers";


export function AoCDayOne() {
    const reader = getFileReader('input/day01_1.txt');

    let currentCalories = 0;
    let elfCalories: number[] = [];

    reader.on('line', (line) => {
        if(line.length === 0) {
        elfCalories.push(currentCalories);
        currentCalories = 0;
        } else {
            currentCalories += parseInt(line);
        }
    })

    reader.on('close', () => {
        // Take care of the final calories if they haven't been added yet.
        if (currentCalories !== 0) {
            elfCalories.push(currentCalories);
        }

        elfCalories.sort((a, b) => b - a);
        console.log(`[DAY 1, PART 1] Max calories: ${elfCalories[0]}`);
        console.log(`[DAY 1, PART 2] Top three calories: ${elfCalories[0]+elfCalories[1]+elfCalories[2]}\n`);
    });
}