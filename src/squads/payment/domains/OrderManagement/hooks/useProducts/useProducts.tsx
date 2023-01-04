import {
    Payment_GetManyProductsByProductIdsQuery,
    Payment_GetManyProductsByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import { UseQueryBaseOptions, UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseProductsProps {
    productIds: Payment_GetManyProductsByProductIdsQueryVariables["productIds"];
    options: UseQueryBaseOptions<Payment_GetManyProductsByProductIdsQuery["product"]>;
}

export type UseProductsReturn = UseQueryBaseReturn<
    Payment_GetManyProductsByProductIdsQuery["product"] | undefined
>;

const useProducts = ({
    productIds,
    options: { enabled, onSuccess },
}: UseProductsProps): UseProductsReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "product",
        action: "paymentGetManyProductsByProductIds",
    })(
        { productIds },
        {
            enabled: enabled,
            onSuccess: (data) => {
                onSuccess?.(data || []);
            },
            onError: (error) => {
                window.warner?.warn("useProducts in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} product - paymentGetManyProductsByProductIds`,
                    "error"
                );
            },
        }
    );
};

export default useProducts;
