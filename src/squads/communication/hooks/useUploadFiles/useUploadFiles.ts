import { useCallback } from "react";

import { FileRejection } from "react-dropzone";
import { AudioType, ImageType, MIMETypes, VideoType } from "src/common/constants/enum";
import { getEnumString } from "src/common/constants/helper";
import { convertByte } from "src/common/utils/file";
import inferMutation from "src/squads/communication/service/infer-mutation";

import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";

const useUploadFiles = (maxSize?: number) => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const getReasonCausedFileRejected = useCallback(
        (fileRejections: FileRejection[]) => {
            fileRejections.map(({ file }) => {
                const { size, unit } = convertByte(maxSize);
                showSnackbar(
                    t("ra.manabie-error.uploadedFileIsInvalid", {
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

    const { isLoading, mutate } = inferMutation({
        entity: "mediaBob",
        action: "communicationFilterAndUploadFiles",
    })({
        onError: (err) => {
            window.warner?.warn("useUploadFiles media upload", err.message);
            showSnackbar(`${t("ra.manabie-error.cannotUpload")}: ${t(err.message)}`, "error");
        },
    });

    return {
        onUploadFiles: mutate,
        onDropRejected,
        isUploading: isLoading,
    };
};
export default useUploadFiles;
