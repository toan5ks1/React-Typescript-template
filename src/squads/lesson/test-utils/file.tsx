interface CreateFile {
    (fileName?: string, fileProperty?: FilePropertyBag): File;
}

export const createFile: CreateFile = (
    fileName = "FILE_NAME",
    fileProperty = {
        type: "image/png",
    }
) => {
    return new File([new ArrayBuffer(1)], fileName, fileProperty);
};
