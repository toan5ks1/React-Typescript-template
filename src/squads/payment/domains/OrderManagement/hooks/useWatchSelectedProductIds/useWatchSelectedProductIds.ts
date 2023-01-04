import { useWatch } from "react-hook-form";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { isNotUndefinedOrNull } from "src/squads/payment/utils/types";

import { Product } from "src/squads/payment/__generated__/fatima/root-types";

interface UseWatchSelectedProductIdsReturnType {
    selectedProductIds: Product["product_id"][];
}

const useWatchSelectedProductIds = (studentIndex: number): UseWatchSelectedProductIdsReturnType => {
    const [productFieldArrayItems] = useWatch<
        OrderFormValues,
        [`students.${number}.productFieldArrayItems`]
    >({
        name: [`students.${studentIndex}.productFieldArrayItems`],
    });

    const selectedProductIds = productFieldArrayItems
        .map<ProductTypeQuery["product_id"] | undefined>(
            (productFieldItem) => productFieldItem.product?.product_id
        )
        .filter<ProductTypeQuery["product_id"]>(isNotUndefinedOrNull);

    const selectedAssociatedProductIds =
        productFieldArrayItems.map((productFieldItem) =>
            productFieldItem.associatedProducts?.map(
                (associatedProduct) => associatedProduct.product.product_id
            )
        ) || [];

    selectedAssociatedProductIds.forEach((associatedProductIds) => {
        associatedProductIds?.forEach((productId) => {
            selectedProductIds.push(productId);
        });
    });

    return { selectedProductIds };
};

export default useWatchSelectedProductIds;
