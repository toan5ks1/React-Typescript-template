import { useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { removeByIndex } from "src/common/utils/other";
import { convertFileToCSV } from "src/squads/user/common/utils/cvs";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

export interface UseFilesReturn {
    files: File[];
    onChange: (files: File[]) => Promise<void>;
    onRemove: (index: number) => void;
}

export const useFiles = (defaultFiles?: File[]): UseFilesReturn => {
    const [files, setFiles] = useState<File[]>(defaultFiles || []);
    const tResource = useResourceTranslate(ERPModules.STUDENTS);
    const showSnackbar = useShowSnackbar();

    const onChange = async (importedFile: File[]) => {
        try {
            await convertFileToCSV(importedFile[0]);
            setFiles([...files, ...importedFile]);
        } catch (error) {
            showSnackbar(tResource(`messages.error.invalidMaxSizeFile`), "error");
        }
    };

    const onRemove = (index: number) => {
        const remainFiles = removeByIndex(files, index);
        setFiles(remainFiles);
    };

    return {
        files,
        onChange,
        onRemove,
    };
};

export default useFiles;
