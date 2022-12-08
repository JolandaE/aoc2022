import { getFileReader } from "../helpers/filehelpers";

function getViewingDistance(tree: number, treeLine: number[], isUpOrLeft: boolean): number {
    // reverse the array to check LTR
    if (isUpOrLeft){
        treeLine = treeLine.reverse();
    }
    
    let distance = 0;
    for (let i=0; i<treeLine.length; i++){
        if (treeLine[i] >= tree){
            distance = i+1;
            break;
        } 
    }
    distance = distance === 0 ? treeLine.length : distance;
    return distance;
}

function getTreeLines(row: number, column: number, grid: number[][]): [number[], number[], number[], number[]] {
    const leftTrees = grid[row].slice(0, column);
    const rightTrees = grid[row].slice(column+1, grid[row].length);
    const upTrees = [];
    const downTrees = [];

    for (let index = 0; index < grid.length; index++){
        if (index < row) {
            upTrees.push(grid[index][column])
        } else if (index > row) {
            downTrees.push(grid[index][column])
        }
    }

    return [leftTrees, rightTrees, upTrees, downTrees];
}

function getScenicView(row: number, column: number, grid: number[][]): number{
    const tree: number = grid[row][column]; 
    const [leftTrees, rightTrees, upTrees, downTrees] = getTreeLines(row, column, grid);

    return getViewingDistance(tree, leftTrees, true) * getViewingDistance(tree, rightTrees, false) 
        * getViewingDistance(tree, upTrees, true) * getViewingDistance(tree, downTrees, false);
}

function treeIsVisible(tree: number, treeLine: number[]): boolean {
    return treeLine.filter(bTree => bTree < tree).length === treeLine.length;
}

function isVisible(row: number, column: number, grid: number[][]): boolean {
    const tree: number = grid[row][column];
    
    // zero will always return false;
    if (tree == 0) {
        return false;
    }

    // logic to check row;
    const leftTrees = grid[row].slice(0, column).sort((a,b) => b-a);
    const rightTrees = grid[row].slice(column+1, grid[row].length).sort((a,b) => b-a);
    
    // A tree only needs to be visible in one direction, therefore we can cut the check short
    // once one of the methods evaluates to true.
    if (treeIsVisible(tree, leftTrees)){
        return true;
    }

    if (treeIsVisible(tree, rightTrees)){
        return true;
    }

    // Continue with the columns;
    const [_, __, upTrees, downTrees] = getTreeLines(row, column, grid);

    if (treeIsVisible(tree, upTrees)) {
        return true;
    }

    if (treeIsVisible(tree, downTrees)) {
        return true;
    }
    
    return false;

}

export function AoCDayEight() { 
    // npx tsc -w
    const reader = getFileReader('input/day08_1.txt');

    let treeGrid: number[][] = [];

    reader.on('line', (line) => {
        treeGrid.push(line.split('').map(a => parseInt(a)));
    });

    reader.on('close', () => {    
        // count the sides, subtract 4 so the corners aren't counted twice 
        const edgeTrees = (treeGrid[0].length *2) + (treeGrid.length *2) -4; 
        let visibleTrees = edgeTrees;

        const scenicView: number[] = [];

        // skip the edges of the grid as these are counted separately,
        // then loop through the rest of it
        for (let i = 1; i < treeGrid.length-1; i++){
            const row = treeGrid[i]; 
            for (let j = 1; j < row.length-1; j++){
                if (isVisible(i,j, treeGrid)) {
                    visibleTrees++;
                }
                scenicView.push(getScenicView(i, j, treeGrid))
            }
        }

        console.log('[DAY 8, PART 1]: ',visibleTrees);
        console.log('[DAY 8, PART 2]: ',scenicView.sort((a,b)=> b-a)[0])
    })
}
