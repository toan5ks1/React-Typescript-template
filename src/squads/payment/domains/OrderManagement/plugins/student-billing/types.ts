import React from "react";

import { ProductAndProductExtensionType } from "src/squads/payment/types/service/product-types";

import { OneTimeAndSlotBasedBillItemDescriptionCellProps } from "src/squads/payment/domains/OrderManagement/plugins/student-billing/components/OneTimeAndSlotBasedBillItemDescriptionCell";
import { RecurringBillItemDescriptionCellProps } from "src/squads/payment/domains/OrderManagement/plugins/student-billing/components/RecurringBillItemDescriptionCell";
import { RecurringProductProductListCellProps } from "src/squads/payment/domains/OrderManagement/plugins/student-billing/components/RecurringProductProductListCell";

import { ProductPluginsMapType } from "src/squads/payment/domains/OrderManagement/plugins/common/types";
import { ProductsListItemCellPropsType } from "src/squads/payment/domains/OrderManagement/plugins/order-details/types";

export interface StudentBillingFunctions {
    ProductDetailsProductListCell: (
        props: ProductsListItemCellPropsType | RecurringProductProductListCellProps
    ) => React.ReactElement;
    BillItemDescriptionBillingItemsCell: (
        props:
            | OneTimeAndSlotBasedBillItemDescriptionCellProps
            | RecurringBillItemDescriptionCellProps
    ) => React.ReactElement;
}

export interface StudentBillingPluginsContextValues {
    productPluginsMap: ProductPluginsMapType<StudentBillingFunctions>;
    getProductPluginsMap: (
        productAndProductExtensionType: ProductAndProductExtensionType
    ) => StudentBillingFunctions;
}
