import inferMutation from "src/squads/syllabus/services/infer-mutation";

import logger from "../../internals/logger";
import useShowSnackbar from "../useShowSnackbar";
import useTranslate from "../useTranslate";

const useUploadBrightcove = () => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferMutation({
        entity: "media",
        action: "MEDIA_UPLOAD_VIDEO",
    })({
        onError: (err) => {
            logger.warn("[useUploadBrightcove]", err);

            showSnackbar(`${t("ra.manabie-error.cannotUpload")}: ${t(err.message)}`, "error");
        },
    });
};
export default useUploadBrightcove;
