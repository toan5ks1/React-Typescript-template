import { Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseBillingSchedulePeriodsProps {
    billingScheduleIds:
        | Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables["billingScheduleIds"]
        | undefined;
    enabled?: boolean;
    onSuccess?: (data: BillingSchedulePeriod[] | undefined) => void;
}

const useBillingSchedulePeriodsByBillingScheduleIds = ({
    billingScheduleIds,
    enabled = true,
    onSuccess,
}: UseBillingSchedulePeriodsProps): UseQueryBaseReturn<BillingSchedulePeriod[] | undefined> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "billingSchedulePeriod",
        action: "paymentGetManyBillingSchedulePeriodsByManyBillingScheduleId",
    })(
        { billingScheduleIds },
        {
            enabled: enabled && Boolean(billingScheduleIds),
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn(
                    "useBillingSchedulePeriodsByBillingScheduleIds in Payment Order",
                    error
                );

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} billingSchedulePeriod - paymentGetManyBillingSchedulePeriodsByManyBillingScheduleId`,
                    "error"
                );
            },
        }
    );
};

export default useBillingSchedulePeriodsByBillingScheduleIds;
