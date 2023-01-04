import {
    Payment_GetManyOrderItemsByStudentProductIdsQuery,
    Payment_GetManyOrderItemsByStudentProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface useOrderItemsByStudentProductIdsProps {
    studentProductIds: Payment_GetManyOrderItemsByStudentProductIdsQueryVariables["student_product_ids"];
    onSuccess?: (data: Payment_GetManyOrderItemsByStudentProductIdsQuery["order_item"]) => void;
    enabled?: boolean;
}

function useOrderItemsByStudentProductIds({
    studentProductIds,
    onSuccess,
    enabled = true,
}: useOrderItemsByStudentProductIdsProps): UseQueryBaseReturn<
    Payment_GetManyOrderItemsByStudentProductIdsQuery["order_item"]
> {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "orderItem",
        action: "paymentGetManyOrderItemsByStudentProductIds",
    })(
        {
            student_product_ids: studentProductIds,
        },
        {
            enabled,
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useOrderItemsByStudentProductIds in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} orderItem - paymentGetManyOrderItemsByStudentProductIds`,
                    "error"
                );
            },
        }
    );
}

export default useOrderItemsByStudentProductIds;
