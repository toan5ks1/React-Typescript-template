import { useCallback } from "react";

import logger from "../../internals/logger";
import inferMutation from "../../services/infer-mutation";
import useShowSnackbar from "../useShowSnackbar";
import useTranslate from "../useTranslate";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";

type InputFile = Media | File;

const useUploadFiles = () => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { isLoading, mutate, mutateAsync } = inferMutation({
        entity: "media",
        action: "MEDIA_FILTER_AND_UPLOAD_FILES",
    })({
        onError: (err: Error) => {
            logger.warn("[useUploadFiles]", err);

            showSnackbar(`${t("ra.manabie-error.cannotUpload")}: ${t(err.message)}`, "error");
        },
    });

    const onUploadFiles = useCallback(
        (files: InputFile[], options: Parameters<typeof mutate>[1]) => {
            return mutate(files, options);
        },

        [mutate]
    );

    const onUploadFilesAsync = useCallback(
        (files: InputFile[], options?: Parameters<typeof mutateAsync>[1]) => {
            return mutateAsync(files, options);
        },

        [mutateAsync]
    );

    return {
        onUploadFiles,
        onUploadFilesAsync,
        isUploading: isLoading,
    };
};
export default useUploadFiles;
