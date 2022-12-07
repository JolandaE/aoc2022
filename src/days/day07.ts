import { getFileReader } from "../helpers/filehelpers";

type File = {
    name: string,
    size: number
}

type Directory = {
    path: string,
    directories: Directory[],
    files: File[],
    size: number,
}

function createDirectory(path: string): Directory {
    return {
        path: path,
        directories: [],
        files: [],
        size: 0
    }
}

function createFile(name: string, size: number): File { 
    return {
        name: name,
        size: size
    }
}

/***
 * This function updates the file sizes for all directories within the current path
 */
function updateFileSizes(paths: string[], fileSize: number){
    for(let i=1; i<paths.length+1; i++){
        const path = paths.slice(0, i).join('/');
        const dir = allDirectories.find(dir => dir.path === path);
        if (dir) {
            dir.size += fileSize;
        }
    }
}

function findDirectory(directories: Directory[], path: string): Directory | undefined {
    return directories.find(directory => directory.path === path);
}

// Default to root at the beginning
let allDirectories: Directory[] = [createDirectory('/')];
let currentPath: string[] = ['/'];

export function AoCDaySeven(){
    // npx tsc -w
    const reader = getFileReader('input/day07_1.txt');

    reader.on('line', (line) => {
        // If lines do not start with a $ we are looking at a listed file or directory
        if(!line.startsWith('$')){
            const item = line.split(' ');
            const currentDirectory = findDirectory(allDirectories, currentPath.join('/'));
            
            if (item[0] === 'dir' && currentDirectory) {
                const directoryPath = `${currentPath.join('/')}/${item[1]}`;

                // If the directory does not yet exist, create it
                if (!findDirectory(currentDirectory.directories, directoryPath)){
                    const newDir = createDirectory(directoryPath);
                    currentDirectory.directories.push(newDir);
                    allDirectories.push(newDir);
                }
            } else {
               // If the file does not exist, create it 
               if (!currentDirectory?.files.find(file => file.name === item[1])){
                    const fileSize = parseInt(item[0]);

                    // Push the file to the currentDirectory and update the filesize for the whole tree.
                    if (currentDirectory) { 
                        currentDirectory.files.push(createFile(item[1], fileSize));
                        updateFileSizes(currentPath, fileSize);
                    };
               }
            }
        }
    
        else if (line.startsWith("$ cd")) {
            const dir = line.split(' ')[2];

            if (dir === '/') {
                currentPath = ['/']; //reset to root
            } else if (dir === '..') {
                currentPath.pop(); // move up a folder
            } else {
                const parentFolder = findDirectory(allDirectories, currentPath.join('/'));
                currentPath.push(dir);
                const directory = findDirectory(allDirectories, currentPath.join('/'));
                
                // Sanity check, if the directory hasn't been created as part of a ls statement, still create it.
                if (!directory){
                    const newDir = createDirectory(currentPath.join('/'));
                    parentFolder?.directories.push(newDir);
                    allDirectories.push(newDir);
                }
                }
            }
    });

    reader.on('close', () => {
        let sum = 0;
        allDirectories.filter(dir => dir.size <= 100000).forEach(dir => sum += dir.size)
        console.log('[DAY 7, PART 1]: ', sum);
    
        // Part two
        let unusedSpace = 70000000 - allDirectories[0].size;
        let spaceToFree = 30000000 - unusedSpace;
        
        const bigFolders = allDirectories.filter(dir => dir.size > spaceToFree).sort((a,b) => a.size - b.size);
        console.log('[DAY 7, PART 2]: ', bigFolders[0].path);
    });
}