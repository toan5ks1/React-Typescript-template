import { useCallback } from "react";

import { FileRejection } from "react-dropzone";
import { AudioType, ImageType, VideoType, MIMETypes } from "src/common/constants/enum";
import { getEnumString } from "src/common/constants/helper";
import { convertByte } from "src/common/utils/file";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

interface UseFileRejectedProps {
    maxSize?: number;
}

const useFileRejected = ({ maxSize }: UseFileRejectedProps) => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const onDropRejected = useCallback(
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

    return {
        onDropRejected,
    };
};

export default useFileRejected;
