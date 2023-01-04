import { useCallback } from "react";

import { FileRejection } from "react-dropzone";
import { AudioType, ImageType, MIMETypes, VideoType } from "src/common/constants/enum";
import { getEnumString } from "src/common/constants/helper";
import { convertByte } from "src/common/utils/file";

import useShowSnackbar from "src/hooks/useShowSnackbar";
import useTranslate from "src/hooks/useTranslate";

const useUploadFiles = (maxSize?: number) => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const getReasonCausedFileRejected = useCallback(
        (fileRejections: FileRejection[]) => {
            fileRejections.map(({ file }) => {
                const { size, unit } = convertByte(maxSize);
                showSnackbar(
                    t(`ra.manabie-error.uploadedFileIsInvalid`, {
                        fileType: getEnumString(
                            { ...ImageType, ...VideoType, ...MIMETypes, ...AudioType },
                            file.type
                        ),
                        fileMaxSize: size,
                        fileUnit: unit,
                    }),
                    "error"
                );
            });
        },
        [showSnackbar, t, maxSize]
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
