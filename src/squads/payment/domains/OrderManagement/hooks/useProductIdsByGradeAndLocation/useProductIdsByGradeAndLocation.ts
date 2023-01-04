import intersection from "lodash/intersection";
import { isUndefined } from "src/common/utils/other";
import {
    Payment_GetProductIdsByGradeIdsQueryVariables,
    Payment_GetProductIdsByLocationIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseProductIdsByGradeAndLocationReturn {
    productIds: ProductTypeQuery["product_id"][];
    isFetching: boolean;
}

export interface UseProductIdsByGradeAndLocationProps {
    gradeIds: Payment_GetProductIdsByGradeIdsQueryVariables["grade_ids"];
    locationIds: Payment_GetProductIdsByLocationIdsQueryVariables["location_ids"];
}

function useProductIdsByGradeAndLocation({
    gradeIds,
    locationIds,
}: UseProductIdsByGradeAndLocationProps): UseProductIdsByGradeAndLocationReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { data: gradeBasedProductIds, isFetching: isFetchingGradeBasedProductIds } = inferQuery({
        entity: "productGrade",
        action: "paymentGetProductIdsByGradeIds",
    })(
        {
            grade_ids: gradeIds,
        },
        {
            enabled: Boolean(gradeIds),
            selector: (productIdsResult) => {
                return productIdsResult?.map((product) => product.product_id);
            },
            onError: (error) => {
                window.warner?.warn("useProductIdsByGradeAndLocation", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} productGrade - paymentGetProductIdsByGradeIds`,
                    "error"
                );
            },
        }
    );
    const { data: locationBasedProductIds, isFetching: isFetchingLocationBasedProductIds } =
        inferQuery({ entity: "productLocation", action: "paymentGetProductIdsByLocationIds" })(
            {
                location_ids: locationIds,
            },
            {
                enabled: Boolean(locationIds),
                selector: (productIdsResult) => {
                    return productIdsResult?.map((product) => product.product_id);
                },
                onError: (error) => {
                    window.warner?.warn("useProductIdsByGradeAndLocation", error);

                    showSnackbar(
                        `${t(
                            "ra.message.unableToLoadData"
                        )} productLocation - paymentGetProductIdsByLocationIds`,
                        "error"
                    );
                },
            }
        );

    const productIds =
        !isUndefined(locationBasedProductIds) && !isUndefined(gradeBasedProductIds)
            ? intersection(locationBasedProductIds, gradeBasedProductIds)
            : [];

    return {
        productIds,
        isFetching: isFetchingGradeBasedProductIds || isFetchingLocationBasedProductIds,
    };
}

export default useProductIdsByGradeAndLocation;
