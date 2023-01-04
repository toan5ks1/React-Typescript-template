import { Context, createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import {
    KeyProductFeeTypes,
    KeyProductMaterialTypes,
    KeyProductPackageTypes,
} from "src/squads/payment/constants/const";
import { OrderCurrency } from "src/squads/payment/constants/enum";
import { ProductAndProductExtensionType } from "src/squads/payment/types/service/product-types";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { ProductPluginsMapType } from "src/squads/payment/domains/OrderManagement/plugins/common/types";
import generateProductFeeOneTimePlugin from "src/squads/payment/domains/OrderManagement/plugins/new-order/FeeOneTimePlugin";
import generateProductMaterialOneTimePlugin from "src/squads/payment/domains/OrderManagement/plugins/new-order/MaterialOneTimePlugin";
import generateProductMaterialRecurringPlugin from "src/squads/payment/domains/OrderManagement/plugins/new-order/MaterialRecurringPlugin";
import generateProductPackageFrequencyBasedPlugin from "src/squads/payment/domains/OrderManagement/plugins/new-order/PackageFrequencyBasedPlugin";
import generateProductPackageOneTimePlugin from "src/squads/payment/domains/OrderManagement/plugins/new-order/PackageOneTimePlugin";
import generateProductScheduleBasedPackagePlugin from "src/squads/payment/domains/OrderManagement/plugins/new-order/PackageScheduleBasedPlugin";
import generateProductPackageSlotBasedPlugin from "src/squads/payment/domains/OrderManagement/plugins/new-order/PackageSlotBasedPlugin";
import {
    OrderPluginFunctions,
    UpdateOrderPluginFunctions,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";
import generateUpdateProductMaterialOneTimePlugin from "src/squads/payment/domains/OrderManagement/plugins/update-order/MaterialOneTimePlugin";
import generateUpdateProductReccuringMaterialPlugin from "src/squads/payment/domains/OrderManagement/plugins/update-order/RecurringMaterialPlugin";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

interface ProductExtensionPluginsContextValues<
    T extends OrderPluginFunctions = OrderPluginFunctions
> {
    getProductPluginsMap: (productAndProductExtensionType: ProductAndProductExtensionType) => T;
    currency: OrderCurrency;
    orderType: OrderType;
}
const ProductExtensionPluginsContext = createContext<ProductExtensionPluginsContextValues>(
    {} as ProductExtensionPluginsContextValues
);

export const useProductPluginsContext = <T extends OrderPluginFunctions = OrderPluginFunctions>() =>
    useContext<ProductExtensionPluginsContextValues<T>>(
        // We put in any here because we only know about the plugin type in run time base the order type it's passing in ProductExtensionPluginsProvider
        // If order type is OrderType.ORDER_TYPE_NEW then any should be OrderPluginFunctions
        // If order type is OrderType.ORDER_TYPE_UPDATE then any should be UpdateOrderPluginFunctions
        // If we want to not use any we have to create ProductExtensionPluginsContext inside ProductExtensionPluginsProvider but then useProductPluginsContext would get a new instance everytime
        // unless we want to create a variable outside then reassign everytime we recreate the context
        // Since we don't want to do that we have to use any
        ProductExtensionPluginsContext as Context<ProductExtensionPluginsContextValues<any>>
    );

const ProductExtensionPluginsProvider = <T extends OrderPluginFunctions>({
    children,
    notImplementedYetPlugins,
    currency = OrderCurrency.JAPANESE_YEN,
    orderType = OrderType.ORDER_TYPE_NEW,
}: PropsWithChildren<{
    currency: OrderCurrency;
    orderType: OrderType;
    notImplementedYetPlugins: T;
}>) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const productPluginsMap: ProductPluginsMapType<OrderPluginFunctions> = useMemo(
        () => ({
            material: {
                [KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME]:
                    generateProductMaterialOneTimePlugin(currency),
                [KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING]:
                    generateProductMaterialRecurringPlugin(currency),
            },
            packageEntity: {
                [KeyProductPackageTypes.PACKAGE_TYPE_ONE_TIME]:
                    generateProductPackageOneTimePlugin(currency),
                [KeyProductPackageTypes.PACKAGE_TYPE_SLOT_BASED]:
                    generateProductPackageSlotBasedPlugin(currency),
                [KeyProductPackageTypes.PACKAGE_TYPE_SCHEDULED]:
                    generateProductScheduleBasedPackagePlugin(currency),
                [KeyProductPackageTypes.PACKAGE_TYPE_FREQUENCY]:
                    generateProductPackageFrequencyBasedPlugin(currency),
            },
            fee: {
                [KeyProductFeeTypes.FEE_TYPE_ONE_TIME]: generateProductFeeOneTimePlugin(currency),
            },
        }),
        [currency]
    );

    const updateProductsPluginsMap: ProductPluginsMapType<UpdateOrderPluginFunctions> = useMemo(
        () => ({
            material: {
                [KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME]:
                    generateUpdateProductMaterialOneTimePlugin(currency, tOrder("tag.adjustment")),
                [KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING]:
                    generateUpdateProductReccuringMaterialPlugin(
                        currency,
                        tOrder("tag.adjustment")
                    ),
            },
            packageEntity: undefined,
            fee: undefined,
        }),
        [currency, tOrder]
    );

    const getProductPluginsMap = useCallback(
        (productAndProductExtensionType: ProductAndProductExtensionType) => {
            const { productEntityType, productExtensionType } = productAndProductExtensionType;

            let productTypePluginsMap;

            switch (orderType) {
                case OrderType.ORDER_TYPE_UPDATE:
                    productTypePluginsMap = updateProductsPluginsMap[productEntityType];
                    break;
                case OrderType.ORDER_TYPE_NEW:
                case OrderType.ORDER_TYPE_ENROLLMENT:
                default:
                    productTypePluginsMap = productPluginsMap[productEntityType];
                    break;
            }

            if (!productTypePluginsMap) return notImplementedYetPlugins;

            const productExtensionPlugin = productTypePluginsMap[productExtensionType];

            return productExtensionPlugin || notImplementedYetPlugins;
        },
        [notImplementedYetPlugins, orderType, productPluginsMap, updateProductsPluginsMap]
    );

    const contextValue: {
        getProductPluginsMap: (
            productAndProductExtensionType: ProductAndProductExtensionType
        ) => OrderPluginFunctions;
        currency: OrderCurrency;
        orderType: OrderType;
    } = useMemo(
        () => ({ getProductPluginsMap, currency, orderType }),
        [currency, getProductPluginsMap, orderType]
    );

    return (
        <ProductExtensionPluginsContext.Provider value={contextValue}>
            {children}
        </ProductExtensionPluginsContext.Provider>
    );
};

export default ProductExtensionPluginsProvider;
