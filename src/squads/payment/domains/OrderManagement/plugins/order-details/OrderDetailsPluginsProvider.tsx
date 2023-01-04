import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";

import { ProductAndProductExtensionType } from "src/squads/payment/types/service/product-types";

import NotImplementYet from "src/squads/payment/components/NotImplementYet";

import {
    ProductExtensionPluginsMap,
    ProductPluginsMapType,
} from "src/squads/payment/domains/OrderManagement/plugins/common/types";
import orderDetailPluginsMap from "src/squads/payment/domains/OrderManagement/plugins/order-details/plugins-map";
import {
    OrderDetailsFunctions,
    OrderDetailsPluginsContextValues,
} from "src/squads/payment/domains/OrderManagement/plugins/order-details/types";

const notImplementedYetPlugins: OrderDetailsFunctions = {
    ProductsListItemCell: () => {
        return <NotImplementYet isImplemented={false} mt={2} textAlign="center" />;
    },
    BillingItemsCell: () => {
        return <NotImplementYet isImplemented={false} />;
    },
};

const OrderDetailsPluginsContext = createContext<OrderDetailsPluginsContextValues>(
    {} as OrderDetailsPluginsContextValues
);

export const useProductTypePluginsContext = () => {
    return useContext(OrderDetailsPluginsContext);
};

const OrderDetailsPluginsProvider = ({ children }: PropsWithChildren<{}>) => {
    const getOrderDetailPluginsMap = useCallback(
        (productAndProductExtensionType: ProductAndProductExtensionType) => {
            const { productEntityType, productExtensionType } = productAndProductExtensionType;

            const productTypePluginsMap:
                | ProductExtensionPluginsMap<OrderDetailsFunctions>
                | undefined = orderDetailPluginsMap[productEntityType];

            if (!productTypePluginsMap) return notImplementedYetPlugins;

            const productDetailsPlugin: OrderDetailsFunctions | undefined =
                productTypePluginsMap[productExtensionType];

            return productDetailsPlugin || notImplementedYetPlugins;
        },
        []
    );

    const contextValue: {
        productPluginsMap: ProductPluginsMapType<OrderDetailsFunctions>;
        getProductPluginsMap: (
            productAndProductExtensionType: ProductAndProductExtensionType
        ) => OrderDetailsFunctions;
    } = useMemo(
        () => ({
            productPluginsMap: orderDetailPluginsMap,
            getProductPluginsMap: getOrderDetailPluginsMap,
        }),
        [getOrderDetailPluginsMap]
    );

    return (
        <OrderDetailsPluginsContext.Provider value={contextValue}>
            {children}
        </OrderDetailsPluginsContext.Provider>
    );
};

export default OrderDetailsPluginsProvider;
