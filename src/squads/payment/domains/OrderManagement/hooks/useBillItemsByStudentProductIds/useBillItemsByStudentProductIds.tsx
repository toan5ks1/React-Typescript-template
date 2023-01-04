import {
    Payment_GetManyBillItemsByStudentProductIdsV2Query,
    Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseBillItemsByStudentProductIdsProps {
    studentProductIds: Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables["student_product_ids"];
    onSuccess?: (data: Payment_GetManyBillItemsByStudentProductIdsV2Query["bill_item"]) => void;
    enabled?: boolean;
}

function useBillItemsByStudentProductIds({
    studentProductIds,
    onSuccess,
    enabled = true,
}: UseBillItemsByStudentProductIdsProps): UseQueryBaseReturn<
    Payment_GetManyBillItemsByStudentProductIdsV2Query["bill_item"]
> {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({ entity: "billItem", action: "paymentGetManyBillItemsByStudentProductIds" })(
        {
            student_product_ids: studentProductIds,
        },
        {
            enabled,
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useBillItemsByStudentProductIds in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} billItem - paymentGetManyBillItemsByStudentProductIds`,
                    "error"
                );
            },
        }
    );
}

export default useBillItemsByStudentProductIds;
