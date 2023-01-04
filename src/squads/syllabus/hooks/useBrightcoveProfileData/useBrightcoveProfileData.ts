import logger from "src/squads/syllabus/internals/logger";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

function useBrightcoveProfileData() {
    const showSnackBar = useShowSnackbar();
    const t = useTranslate();

    const { data = { accountId: "", policyKey: "" } } = inferQuery({
        entity: "brightcove",
        action: "syllabusBrightcoveGetProfile",
    })(undefined, {
        enabled: true,
        onError: (err) => {
            logger.warn("useBrightcoveProfileData", err);
            showSnackBar(t("ra.manabie-error.specified.getBrightcoveProfileFail"), "error");
        },
    });

    return data;
}

export default useBrightcoveProfileData;
