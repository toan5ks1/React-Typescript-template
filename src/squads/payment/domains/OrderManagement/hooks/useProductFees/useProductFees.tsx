import {
    Payment_GetManyFeesByProductIdsQuery,
    Payment_GetManyFeesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { OrderDetailProductListFeeType } from "src/squads/payment/types/service/product-fee-types";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseProductFeesProps {
    productIds: Payment_GetManyFeesByProductIdsQueryVariables["productIds"];
    enabled?: boolean;
    onSuccess?: (data: Payment_GetManyFeesByProductIdsQuery["fee"] | undefined) => void;
}

const useProductFees = ({
    productIds,
    enabled = true,
    onSuccess,
}: UseProductFeesProps): UseQueryBaseReturn<OrderDetailProductListFeeType[]> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "fee",
        action: "paymentGetManyProductFeesTypeByProductIds",
    })(
        { productIds },
        {
            enabled: enabled,
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useProductFees in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} fee - paymentGetManyProductFeesTypeByProductIds`,
                    "error"
                );
            },
        }
    );
};

export default useProductFees;
