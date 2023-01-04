import {
    KeyProductFeeTypes,
    KeyProductMaterialTypes,
    KeyProductPackageTypes,
} from "src/squads/payment/constants/const";

import BillingItemCell from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/BillingItemCell/BillingItemCell";
import ProductListCell from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/ProductListCell";

import { ProductPluginsMapType } from "src/squads/payment/domains/OrderManagement/plugins/common/types";
import generateRecurringOrderDetailPlugin from "src/squads/payment/domains/OrderManagement/plugins/order-details/generateRecurringOrderDetailPlugin";
import { OrderDetailsFunctions } from "src/squads/payment/domains/OrderManagement/plugins/order-details/types";

const generateOrderDetailPlugin = (): OrderDetailsFunctions => ({
    ProductsListItemCell: ({ productName, discountName, courseItemsList }) => (
        <ProductListCell
            productName={productName}
            discountName={discountName}
            courseItemsList={courseItemsList}
        />
    ),

    BillingItemsCell: ({ productName, courseItemsList }) => (
        <BillingItemCell productName={productName} courseItemsList={courseItemsList} />
    ),
});

const orderDetailPluginsMap: ProductPluginsMapType<OrderDetailsFunctions> = {
    material: {
        [KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME]: generateOrderDetailPlugin(),
        [KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING]: generateRecurringOrderDetailPlugin(),
    },
    packageEntity: {
        [KeyProductPackageTypes.PACKAGE_TYPE_SLOT_BASED]: generateOrderDetailPlugin(),
        [KeyProductPackageTypes.PACKAGE_TYPE_ONE_TIME]: generateOrderDetailPlugin(),
        [KeyProductPackageTypes.PACKAGE_TYPE_FREQUENCY]:
            generateRecurringOrderDetailPlugin("slot-per-week"),
        [KeyProductPackageTypes.PACKAGE_TYPE_SCHEDULED]: generateRecurringOrderDetailPlugin(),
    },
    fee: {
        [KeyProductFeeTypes.FEE_TYPE_ONE_TIME]: generateOrderDetailPlugin(),
    },
};

Object.freeze(orderDetailPluginsMap);
export default orderDetailPluginsMap;
