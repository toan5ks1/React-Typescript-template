import { arrayHasItem } from "src/common/utils/other";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductAndProductExtensionType } from "src/squads/payment/types/service/product-types";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";

import { OrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

interface UseGetBilledAtOrderProductsProps {
    productFieldArrayItems: ProductsFormValues[];
    getProductPluginsMap: (
        productAndProductExtensionType: ProductAndProductExtensionType
    ) => OrderPluginFunctions;
}

const useGetBilledAtOrderProducts = ({
    productFieldArrayItems,
    getProductPluginsMap,
}: UseGetBilledAtOrderProductsProps): BilledAtOrderItemType[] => {
    const getBilledAtOrderProducts = (
        productFieldArrayItems: ProductsFormValues[]
    ): BilledAtOrderItemType[] => {
        return productFieldArrayItems.reduce(
            (billedAtOrderProducts: BilledAtOrderItemType[], productFieldArrayItem) => {
                if (
                    !productFieldArrayItem.product ||
                    !arrayHasItem(productFieldArrayItem.productPrices)
                ) {
                    return [...billedAtOrderProducts];
                }

                const productAndProductExtension =
                    getProductAndProductExtensionType(productFieldArrayItem);

                const { generateBilledAtOrderBillingItems } = getProductPluginsMap(
                    productAndProductExtension
                );

                return [
                    ...billedAtOrderProducts,
                    ...generateBilledAtOrderBillingItems(productFieldArrayItem),
                ];
            },
            []
        );
    };

    const billedAtOrderProducts = getBilledAtOrderProducts(productFieldArrayItems);

    return billedAtOrderProducts;
};

export default useGetBilledAtOrderProducts;
