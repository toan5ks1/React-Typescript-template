import { inferQuery } from "src/squads/lesson/service/infer-query";

import { RetrieveBrightCoveProfileDataResponse } from "manabuf/yasuo/v1/brightcove_pb";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

interface UseBrightcoveProfileDataReturns extends RetrieveBrightCoveProfileDataResponse.AsObject {}

function useBrightcoveProfileData(): UseBrightcoveProfileDataReturns {
    const t = useTranslate();
    const showSnackBar = useShowSnackbar();

    const {
        data = {
            accountId: "",
            policyKey: "",
        },
    } = inferQuery({
        entity: "brightcove",
        action: "lessonGetProfile",
    })(undefined, {
        enabled: true,
        onError: (err) => {
            window.warner?.warn("useBrightcoveProfileData", err);
            showSnackBar(t("ra.manabie-error.specified.getBrightcoveProfileFail"));
        },
    });

    return data;
}

export default useBrightcoveProfileData;
