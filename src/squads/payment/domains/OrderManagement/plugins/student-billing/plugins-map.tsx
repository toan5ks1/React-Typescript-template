import {
    KeyProductFeeTypes,
    KeyProductMaterialTypes,
    KeyProductPackageTypes,
} from "src/squads/payment/constants/const";

import ProductListCell, {
    ProductListCellProps,
} from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/ProductListCell";
import OneTimeAndSlotBasedBillItemDescriptionCell, {
    OneTimeAndSlotBasedBillItemDescriptionCellProps,
} from "src/squads/payment/domains/OrderManagement/plugins/student-billing/components/OneTimeAndSlotBasedBillItemDescriptionCell";
import RecurringBillItemDescriptionCell, {
    RecurringBillItemDescriptionCellProps,
} from "src/squads/payment/domains/OrderManagement/plugins/student-billing/components/RecurringBillItemDescriptionCell";
import RecurringProductProductListCell, {
    RecurringProductProductListCellProps,
} from "src/squads/payment/domains/OrderManagement/plugins/student-billing/components/RecurringProductProductListCell";

import { ProductPluginsMapType } from "src/squads/payment/domains/OrderManagement/plugins/common/types";
import { StudentBillingFunctions } from "src/squads/payment/domains/OrderManagement/plugins/student-billing/types";

const generateOneTimeAndSlotBasedStudentBillingPlugin = (): StudentBillingFunctions => ({
    ProductDetailsProductListCell: ({
        productName,
        discountName,
        courseItemsList,
    }: ProductListCellProps) => (
        <ProductListCell
            productName={productName}
            discountName={discountName}
            courseItemsList={courseItemsList}
        />
    ),
    BillItemDescriptionBillingItemsCell: ({
        productName,
        courseItemsList,
    }: OneTimeAndSlotBasedBillItemDescriptionCellProps) => (
        <OneTimeAndSlotBasedBillItemDescriptionCell
            productName={productName}
            courseItemsList={courseItemsList}
        />
    ),
});

const generateRecurringMaterialStudentBillingPlugin = (): StudentBillingFunctions => {
    const recurringMaterialStudentBillingPlugin = {
        ProductDetailsProductListCell: ({
            productName,
            discountName,
            studentProductLabel,
            updatedToStudentProductId,
        }: RecurringProductProductListCellProps) => (
            <RecurringProductProductListCell
                productName={productName}
                discountName={discountName}
                studentProductLabel={studentProductLabel}
                updatedToStudentProductId={updatedToStudentProductId}
            />
        ),
        BillItemDescriptionBillingItemsCell: ({
            productName,
            billingPeriodName,
            billingRatioNumerator,
            billingRatioDenominator,
        }: RecurringBillItemDescriptionCellProps) => (
            <RecurringBillItemDescriptionCell
                productName={productName}
                billingPeriodName={billingPeriodName}
                billingRatioNumerator={billingRatioNumerator}
                billingRatioDenominator={billingRatioDenominator}
            />
        ),
    };

    return recurringMaterialStudentBillingPlugin;
};

const studentBillingPluginsMap: ProductPluginsMapType<StudentBillingFunctions> = {
    material: {
        [KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME]:
            generateOneTimeAndSlotBasedStudentBillingPlugin(),
        [KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING]:
            generateRecurringMaterialStudentBillingPlugin(),
    },
    packageEntity: {
        [KeyProductPackageTypes.PACKAGE_TYPE_ONE_TIME]:
            generateOneTimeAndSlotBasedStudentBillingPlugin(),
        [KeyProductPackageTypes.PACKAGE_TYPE_SLOT_BASED]:
            generateOneTimeAndSlotBasedStudentBillingPlugin(),
    },
    fee: {
        [KeyProductFeeTypes.FEE_TYPE_ONE_TIME]: generateOneTimeAndSlotBasedStudentBillingPlugin(),
    },
};

Object.freeze(studentBillingPluginsMap);
export default studentBillingPluginsMap;
