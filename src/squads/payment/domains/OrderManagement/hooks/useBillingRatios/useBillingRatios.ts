import { Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { BillingRatio } from "src/squads/payment/types/service/bill-ratio-types";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface useBillingRatiosProps {
    billingSchedulePeriodId:
        | Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables["billingSchedulePeriodId"]
        | undefined;
    enabled?: boolean;
}
const useBillingRatios = ({
    billingSchedulePeriodId,
    enabled = true,
}: useBillingRatiosProps): UseQueryBaseReturn<BillingRatio[] | undefined> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "billingRatio",
        action: "paymentGetManyBillingRatiosByBillingSchedulePeriodId",
    })(
        { billingSchedulePeriodId },
        {
            enabled: enabled && Boolean(billingSchedulePeriodId),
            onError: (error) => {
                window.warner?.warn("useBillingRatios in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} billingRatio - paymentGetManyBillingRatiosByBillingSchedulePeriodId`,
                    "error"
                );
            },
        }
    );
};

export default useBillingRatios;
