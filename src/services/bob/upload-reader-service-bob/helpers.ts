import { MAX_FILE_SIZE, MEGABYTE } from "src/common/constants/file-size";

export const chunkSize = 5 * MEGABYTE; //5MB
export const maxFileSize = MAX_FILE_SIZE;

//TODO: prepare for multi chunk
export function splitChunk(file: File) {
    const numberOfChunks = Math.ceil(file.size / chunkSize);
    return numberOfChunks;
}

//TODO: prepare for multi chunk
export function createChunk(file: File, startChunk: number) {
    let endChunk = startChunk + chunkSize - 1;
    if (endChunk > file.size) {
        endChunk = file.size;
    }

    return { startChunk, endChunk };
}
