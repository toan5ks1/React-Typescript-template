import { useState } from "react";

import { removeByIndex } from "src/common/utils/other";

interface UseFilesReturn {
    files: File[];
    setFiles: (files: File[]) => void;
    onChange: (files: File[]) => void;
    onRemove: (index: number) => void;
}

export const useFiles = (defaultFiles?: File[]): UseFilesReturn => {
    const [files, setFiles] = useState<File[]>(defaultFiles || []);

    const onChange = (importedFile: File[]) => {
        setFiles([...files, ...importedFile]);
    };

    const onRemove = (index: number) => {
        const remainFiles = removeByIndex(files, index);
        setFiles(remainFiles);
    };

    return {
        files,
        setFiles,
        onChange,
        onRemove,
    };
};

export default useFiles;
