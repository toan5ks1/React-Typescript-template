import { useMemo } from "react";

import { inferQuery } from "src/squads/payment/service/infer-query";
import {
    ProductTypeQuery,
    ProductExtensionType,
    ProductEntityType,
} from "src/squads/payment/types/service/product-types";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseProductExtensionProps {
    entity: ProductEntityType;
    productId?: ProductTypeQuery["product_id"];
    onSuccess?: (data: ProductExtensionType) => void;
}

// this hook is used to get more information from product_fee, product_package and product_material table
function useProductExtension({
    entity,
    productId,
    onSuccess,
}: UseProductExtensionProps): UseQueryBaseReturn<ProductExtensionType> {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const enableTrigger = useMemo(() => Boolean(entity) && Boolean(productId), [entity, productId]);
    const errorMessage = useMemo(
        () => `${t("ra.message.unableToLoadData")} ${entity}`,
        [entity, t]
    );

    switch (entity) {
        case "fee":
            return inferQuery({
                entity: "fee",
                action: "paymentGetOneProductFeeByProductId",
            })(
                { product_id: productId },
                {
                    enabled: enableTrigger,
                    onSuccess: (data) => {
                        onSuccess?.(data);
                    },
                    onError: (error) => {
                        window.warner?.warn("useProductExtension - fee", error);
                        showSnackbar(
                            `${errorMessage} - paymentGetOneProductFeeByProductId`,
                            "error"
                        );
                    },
                }
            );
        case "material":
            return inferQuery({
                entity: "material",
                action: "paymentGetOneProductMaterialByProductId",
            })(
                { product_id: productId },
                {
                    enabled: enableTrigger,
                    onSuccess: (data) => {
                        onSuccess?.(data);
                    },
                    onError: (error) => {
                        window.warner?.warn("useProductExtension - material", error);
                        showSnackbar(
                            `${errorMessage} - paymentGetOneProductMaterialByProductId`,
                            "error"
                        );
                    },
                }
            );
        case "packageEntity":
            return inferQuery({
                entity: "packageEntity",
                action: "paymentGetOneProductPackageByProductId",
            })(
                { product_id: productId },
                {
                    enabled: enableTrigger,
                    onSuccess: (data) => {
                        onSuccess?.(data);
                    },
                    onError: (error) => {
                        window.warner?.warn("useProductExtension - packageEntity", error);
                        showSnackbar(
                            `${errorMessage} - paymentGetOneProductPackageByProductId`,
                            "error"
                        );
                    },
                }
            );
    }
}

export default useProductExtension;
