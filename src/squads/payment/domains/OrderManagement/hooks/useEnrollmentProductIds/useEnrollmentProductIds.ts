import { Payment_GetEnrollmentProductIdsByProductIdsQuery } from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export type UseEnrollmentProductIdsReturn = Array<
    ArrayElement<Payment_GetEnrollmentProductIdsByProductIdsQuery["product_setting"]>["product_id"]
>;

export interface UseEnrollmentProductIdsProps {
    productIds: ProductTypeQuery["product_id"][];
    enabled?: boolean;
    onSuccess?: (data: UseEnrollmentProductIdsReturn | undefined) => void;
}

const mapProductIds = (
    data?: Payment_GetEnrollmentProductIdsByProductIdsQuery["product_setting"]
) => {
    if (!data) return [];
    return data.map((product) => product.product_id);
};

const useEnrollmentProductIds = ({
    productIds = [],
    enabled = true,
    onSuccess,
}: UseEnrollmentProductIdsProps): UseQueryBaseReturn<UseEnrollmentProductIdsReturn> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "productSetting",
        action: "paymentGetEnrollmentProductIdsByProductIds",
    })(
        { productIds },
        {
            enabled: enabled,
            selector: (data) => {
                return mapProductIds(data);
            },
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useEnrollmentProductIds in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} productSetting - paymentGetEnrollmentProductIdsByProductIds`,
                    "error"
                );
            },
        }
    );
};

export default useEnrollmentProductIds;
