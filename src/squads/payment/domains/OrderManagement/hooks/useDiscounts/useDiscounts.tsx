import {
    Payment_GetManyDiscountsByDiscountIdsQuery,
    Payment_GetManyDiscountsByDiscountIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { OrderDetailProductListDiscountType } from "src/squads/payment/types/service/discount-types";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseDiscountsProps {
    discountIds: Payment_GetManyDiscountsByDiscountIdsQueryVariables["discountIds"];
    enabled?: boolean;
    onSuccess?: (data: Payment_GetManyDiscountsByDiscountIdsQuery["discount"] | undefined) => void;
}
const useDiscounts = ({
    discountIds,
    enabled = true,
    onSuccess,
}: UseDiscountsProps): UseQueryBaseReturn<OrderDetailProductListDiscountType[]> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "discount",
        action: "paymentGetManyDiscountByDiscountIds",
    })(
        { discountIds },
        {
            enabled: enabled,
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useDiscounts in Payment Order", error);
                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} discount - paymentGetManyDiscountByDiscountIds`,
                    "error"
                );
            },
        }
    );
};

export default useDiscounts;
