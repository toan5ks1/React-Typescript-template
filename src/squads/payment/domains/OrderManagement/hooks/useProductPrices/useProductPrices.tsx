import {
    Payment_GetManyProductPricesByProductIdsQuery,
    Payment_GetManyProductPricesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseProductPricesProps {
    productIds: Payment_GetManyProductPricesByProductIdsQueryVariables["productIds"];
    enabled?: boolean;
    onSuccess?: (
        data: Payment_GetManyProductPricesByProductIdsQuery["product_price"] | undefined
    ) => void;
}
const useProductPrices = ({
    productIds,
    enabled = true,
    onSuccess,
}: UseProductPricesProps): UseQueryBaseReturn<
    Payment_GetManyProductPricesByProductIdsQuery["product_price"] | undefined
> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "productPrice",
        action: "paymentGetManyProductsPriceByProductIds",
    })(
        { productIds },
        {
            enabled: enabled,
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useProductPrices in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} productPrice - paymentGetManyProductsPriceByProductIds`,
                    "error"
                );
            },
        }
    );
};

export default useProductPrices;
