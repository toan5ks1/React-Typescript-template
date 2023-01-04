import {
    Payment_GetManyStudentProductsByStudentProductIdsV2Query,
    Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseStudentProductsProps {
    studentProductIds:
        | Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables["student_product_ids"]
        | undefined;
    enabled?: boolean;
    onSuccess?: (
        data:
            | Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"]
            | undefined
    ) => void;
}

const useStudentProducts = ({
    studentProductIds,
    enabled = true,
    onSuccess,
}: UseStudentProductsProps): UseQueryBaseReturn<
    Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"] | undefined
> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "studentProduct",
        action: "paymentGetManyStudentProductByStudentProductIds",
    })(
        { student_product_ids: studentProductIds },
        {
            enabled: enabled && Boolean(studentProductIds),
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useStudentProducts in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} studentProduct - paymentGetManyStudentProductByStudentProductIds`,
                    "error"
                );
            },
        }
    );
};

export default useStudentProducts;
