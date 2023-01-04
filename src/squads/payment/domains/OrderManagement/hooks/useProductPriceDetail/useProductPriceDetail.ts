import { inferQuery } from "src/squads/payment/service/infer-query";
import {
    ProductPriceListType,
    ProductPriceType,
} from "src/squads/payment/types/service/price-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseProductPriceDetailProps {
    productId?: ProductTypeQuery["product_id"];
    onSuccess?: (data: ProductPriceType[] | undefined) => void;
}

export interface UseProductPriceDetailReturn {
    productPriceDetailData: ProductPriceListType | undefined;
    productPriceDetailRefetch: () => void;
    productPriceDetailLoading: boolean;
}

function useProductPriceDetail({
    productId,
    onSuccess,
}: UseProductPriceDetailProps): UseProductPriceDetailReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const {
        data: productPriceDetailData,
        refetch: productPriceDetailRefetch,
        isLoading: productPriceDetailLoading,
    } = inferQuery({ entity: "productPrice", action: "paymentGetManyProductPricesByProductId" })(
        {
            product_id: productId,
        },
        {
            enabled: Boolean(productId),
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useProductPriceDetail", error);

                showSnackbar(
                    `${t("ra.message.unableToLoadData")} paymentGetManyProductPricesByProductId`,
                    "error"
                );
            },
        }
    );

    return {
        productPriceDetailData,
        productPriceDetailRefetch,
        productPriceDetailLoading,
    };
}

export default useProductPriceDetail;
