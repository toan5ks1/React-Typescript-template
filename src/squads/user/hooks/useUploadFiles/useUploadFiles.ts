import { useCallback } from "react";

import { FileRejection, ErrorCode } from "react-dropzone";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

const useUploadFiles = () => {
    const showSnackbar = useShowSnackbar();
    const tResource = useResourceTranslate(ERPModules.STUDENTS);

    const getReasonCausedFileRejected = useCallback(
        (fileRejections: FileRejection[]) => {
            if (arrayHasItem(fileRejections) && arrayHasItem(fileRejections[0].errors)) {
                switch (fileRejections[0].errors[0].code) {
                    case ErrorCode.TooManyFiles:
                        showSnackbar(tResource(`messages.error.invalidMultipleFiles`), "error");
                        break;
                    default:
                        showSnackbar(tResource(`messages.error.invalidMaxSizeFile`), "error");
                        break;
                }
            }
        },
        [showSnackbar, tResource]
    );

    const onDropRejected = useCallback(
        (fileRejections: FileRejection[]) => {
            getReasonCausedFileRejected(fileRejections);
        },
        [getReasonCausedFileRejected]
    );

    return {
        onDropRejected,
    };
};
export default useUploadFiles;
