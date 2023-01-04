import { ProductAndProductExtensionType } from "src/squads/payment/types/service/product-types";

import { BillingItemCellProps } from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/BillingItemCell/BillingItemCell";
import { ProductListCellProps } from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/ProductListCell";

import { ProductPluginsMapType } from "src/squads/payment/domains/OrderManagement/plugins/common/types";

export type ProductsListItemCellPropsType = ProductListCellProps;

export type BillingItemsCellPropsType = BillingItemCellProps;

export interface OrderDetailsFunctions {
    ProductsListItemCell: (props: ProductsListItemCellPropsType) => React.ReactElement;
    BillingItemsCell: (props: BillingItemsCellPropsType) => React.ReactElement;
}

export interface OrderDetailsPluginsContextValues {
    productPluginsMap: ProductPluginsMapType<OrderDetailsFunctions>;
    getProductPluginsMap: (
        productAndProductExtensionType: ProductAndProductExtensionType
    ) => OrderDetailsFunctions;
}
