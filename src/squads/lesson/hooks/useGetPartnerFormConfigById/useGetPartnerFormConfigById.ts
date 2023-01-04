import { DynamicSection } from "src/squads/lesson/common/types";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export type UseGetLatestPartnerFormConfigReturn = {
    dataConfig: DynamicSection[];
};

export type UseGetLatestPartnerFormConfigProps = {
    formConfigId: string;
};

function useGetPartnerFormConfigById({
    formConfigId,
}: UseGetLatestPartnerFormConfigProps): UseGetLatestPartnerFormConfigReturn {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { data } = inferQuery({
        entity: "partnerFormConfigs",
        action: "partnerFormConfigsGetOne",
    })(
        { form_config_id: formConfigId },
        {
            enabled: Boolean(formConfigId),
            onError: (error: Error) => {
                window.warner?.warn(`useGetPartnerFormConfigById getPartnerConfig`, error);

                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    const dataConfig = data?.form_config_data?.sections || [];

    return { dataConfig };
}

export default useGetPartnerFormConfigById;
