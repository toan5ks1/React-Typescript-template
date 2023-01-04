import { inferQuery } from "src/squads/user/service/infer-service";

import { RetrieveBrightCoveProfileDataResponse } from "manabuf/yasuo/v1/brightcove_pb";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

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
        action: "userGetBrightcoveProfile",
    })(undefined, {
        enabled: true,
        onError: (err) => {
            window.warner?.warn("useBrightcoveProfileData", err);
            showSnackBar(t("ra.manabie-error.specified.getBrightcoveProfileFail", "error"));
        },
    });

    return data;
}

export default useBrightcoveProfileData;
