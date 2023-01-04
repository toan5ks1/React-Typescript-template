import { Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseBillingSchedulePeriodsProps {
    productId?: ProductTypeQuery["product_id"];
    billingScheduleId:
        | Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables["billingScheduleId"]
        | undefined;
    enabled?: boolean;
    onSuccess?: (data: BillingSchedulePeriod[] | undefined) => void;
}

const useBillingSchedulePeriods = ({
    productId,
    billingScheduleId,
    enabled = true,
    onSuccess,
}: UseBillingSchedulePeriodsProps): UseQueryBaseReturn<BillingSchedulePeriod[] | undefined> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "billingSchedulePeriod",
        action: "paymentGetManyBillingSchedulePeriodsByBillingScheduleId",
    })(
        { billingScheduleId, productId },
        {
            enabled: enabled && Boolean(billingScheduleId),
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useBillingSchedulePeriods in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} billingSchedulePeriod - paymentGetManyBillingSchedulePeriodsByBillingScheduleId`,
                    "error"
                );
            },
        }
    );
};

export default useBillingSchedulePeriods;
