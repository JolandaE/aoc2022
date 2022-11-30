import { createReadStream } from 'fs';
import { createInterface, Interface } from 'readline';

export function getFileReader(filePath: string): Interface {
    return createInterface({
        input: createReadStream(filePath)
    });
}