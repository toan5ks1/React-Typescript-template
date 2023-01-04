import {
    Payment_GetManyMaterialsByProductIdsV2Query,
    Payment_GetManyMaterialsByProductIdsV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { OrderDetailProductListMaterialType } from "src/squads/payment/types/service/product-material-types";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseProductMaterialsProps {
    productIds: Payment_GetManyMaterialsByProductIdsV2QueryVariables["productIds"];
    enabled?: boolean;
    onSuccess?: (data: Payment_GetManyMaterialsByProductIdsV2Query["material"] | undefined) => void;
}

const useProductMaterials = ({
    productIds,
    enabled = true,
    onSuccess,
}: UseProductMaterialsProps): UseQueryBaseReturn<OrderDetailProductListMaterialType[]> => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "material",
        action: "paymentGetManyProductMaterialsTypeByProductIds",
    })(
        { productIds },
        {
            enabled: enabled,
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useProductMaterials in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} material - paymentGetManyProductMaterialsTypeByProductIds`,
                    "error"
                );
            },
        }
    );
};

export default useProductMaterials;
