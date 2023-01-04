export const MAX_SIZE_LENGTH = 1000; //1GB max size in BE
export const BYTE = 1000;
export const MEGABYTE = BYTE * BYTE; //1000 * 1000 byte
export const GIGABYTE = BYTE * BYTE * BYTE; //1000 * 1000 * 1000 byte
export const MAX_FILE_SIZE = MAX_SIZE_LENGTH * GIGABYTE; //1GB

export const MAX_FILE_SIZE_VIDEO = 1000000000; //1GB
export const MAX_FILE_SIZE_PDF = 50000000; //50MB
export const MAX_SIZE_EDITOR_UPLOAD = 50000000; //50MB
export const MAX_SIZE_IMAGE = 10000000; // 10MB

export const MAX_FILE_SIZE_CSV = 5000000; //5MB

export const FILE_SIZE_UNITS = {
    MB: "MB",
    GB: "GB",
};
