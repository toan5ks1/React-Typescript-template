import { Payment_GetPackagesByProductIdsQuery } from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseProductMaterialsProps {
    productIds: Array<ProductTypeQuery["product_id"]>;
    enabled?: boolean;
    onSuccess?: (data: Payment_GetPackagesByProductIdsQuery["package"] | undefined) => void;
}

const useProductPackages = ({
    productIds,
    enabled = true,
    onSuccess,
}: UseProductMaterialsProps) => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "packageEntity",
        action: "paymentGetManyProductPackagesByProductIds",
    })(
        { productIds },
        {
            enabled,
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useProductPackages in Payment Order", error);
                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} packageEntity - paymentGetManyProductPackagesByProductIds`,
                    "error"
                );
            },
        }
    );
};

export default useProductPackages;
