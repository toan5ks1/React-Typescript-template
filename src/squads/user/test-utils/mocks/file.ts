import { MIMETypes } from "src/common/constants/enum";

interface CreateFile {
    (fileName?: string, fileProperty?: FilePropertyBag): File;
}

export interface GeneratorFile {
    size: number;
    fileName?: string;
    fileProperty?: FilePropertyBag;
}

export const createFile: CreateFile = (
    fileName = "FILE_NAME",
    fileProperty = {
        type: "image/png",
    }
) => {
    return new File([new ArrayBuffer(1)], fileName, fileProperty);
};

export const createFileWithSize = ({
    size,
    fileName,
    fileProperty,
}: {
    size: number;
    fileName?: string;
    fileProperty?: FilePropertyBag;
}): File => {
    const file = createFile(fileName, fileProperty);
    Object.defineProperty(file, "size", {
        value: size,
    });
    return file;
};

export const generateFiles = (schemas: GeneratorFile[]): File[] => {
    return schemas.map(({ size, fileName, fileProperty }) => {
        return createFileWithSize({ size, fileName, fileProperty });
    });
};

export const createMockFiles = (count: number = 1, type: MIMETypes = MIMETypes.CSV) => {
    const fileSchemas = Array.from(Array(count), (_, i) => i + 1).map((number) => ({
        size: 300 * number,
        fileProperty: {
            type,
        },
    }));

    return generateFiles(fileSchemas);
};

class FileReaderMock {
    DONE = FileReader.DONE;
    EMPTY = FileReader.EMPTY;
    LOADING = FileReader.LOADING;
    readyState = 0;
    error: FileReader["error"] = null;
    result: FileReader["result"] = null;
    abort = jest.fn();
    addEventListener = jest.fn();
    dispatchEvent = jest.fn();
    onabort = jest.fn();
    onerror = jest.fn();
    onload = jest.fn();
    onloadend = jest.fn();
    onloadprogress = jest.fn();
    onloadstart = jest.fn();
    onprogress = jest.fn();
    readAsArrayBuffer = jest.fn();
    readAsBinaryString = jest.fn();
    readAsDataURL = jest.fn();
    readAsText = jest.fn();
    removeEventListener = jest.fn();
}
export const fileReaderMock = new FileReaderMock();

export const createMockFileByBase64 = (base64: string, nameFile: string = "nameFile") => {
    const buff = Buffer.from(base64, "base64");
    return new File([buff], nameFile);
};
