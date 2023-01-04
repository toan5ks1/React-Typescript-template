import { useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { PartnerFormConfigLatestQueried } from "src/squads/lesson/common/types";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export type UseGetLatestPartnerFormConfigReturn = {
    data: PartnerFormConfigLatestQueried | undefined;
    isLoading: boolean;
    error?: Error;
};

export type UseGetLatestPartnerFormConfigProps = {
    featureName?: string;
};

function useGetLatestPartnerFormConfig(
    props: UseGetLatestPartnerFormConfigProps
): UseGetLatestPartnerFormConfigReturn {
    const { featureName } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const [fetchError, setFetchError] = useState<Error | undefined>(undefined);

    const { data, isLoading } = inferQuery({
        entity: "partnerFormConfigs",
        action: "partnerFormConfigsGetOneLatestConfig",
    })(
        { feature_name: featureName },
        {
            enabled: Boolean(featureName),
            onSuccess: (data) => {
                if (!Boolean(data)) {
                    const fetchDataError = new Error(
                        tLessonManagement("errors.errorWhileFetchingFormConfig", {
                            message: tLessonManagement("errors.canNotGetPartnerFormConfig"),
                        })
                    );

                    window.warner?.warn(
                        "useGetLatestPartnerFormConfig fetch error: there is no partner-form-config"
                    );
                    setFetchError(fetchDataError);
                }
            },
            onError: (error: Error) => {
                window.warner?.warn(`useGetLatestPartnerFormConfig fetch error: `, error);
                setFetchError(error);
            },
        }
    );

    return {
        data,
        isLoading,
        error: fetchError,
    };
}

export default useGetLatestPartnerFormConfig;
