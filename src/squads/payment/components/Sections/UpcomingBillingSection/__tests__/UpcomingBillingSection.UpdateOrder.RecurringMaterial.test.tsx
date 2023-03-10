import { UseFormProps } from "react-hook-form";
import { KeyDiscountAmountTypes, KeyDiscountTypes } from "src/squads/payment/constants/const";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { createMockRecurringMaterialProductPrices } from "src/squads/payment/test-utils/mocks/recurring-products";
import {
    createMockRecurringMaterialBillingItem,
    updateProduct,
    updateProductProRatingDisabled,
} from "src/squads/payment/test-utils/mocks/recurring-products-update";
import {
    OrderFormValues,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { ProductMaterialType } from "src/squads/payment/types/service/product-material-types";
import { mockCurrentDateForUnitTests } from "src/squads/payment/utils/date";

import UpcomingBillingSection from "src/squads/payment/components/Sections/UpcomingBillingSection/UpcomingBillingSection";
import { updateOrderNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, within } from "@testing-library/react";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import { generateRecurringMaterialAdjustmentUpcomingBillingItem } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/billingSection";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

const defaultMockOrderFormValues = createMockCompleteOrderFormValues();

const productTax = {
    tax_category: "TAX_CATEGORY_INCLUSIVE",
    tax_percentage: 10,
};

const material: ProductMaterialType = {
    material_type: "MATERIAL_TYPE_RECURRING",
};

const productPrices = createMockRecurringMaterialProductPrices();

const originalDiscount = {
    name: "Discount name",
    discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
    discount_amount_value: 10,
    available_from: "2021-12-28T02:35:17.738471+00:00",
    available_until: "2022-12-28T02:35:17.738471+00:00",
    created_at: "2021-12-28T02:35:17.738471+00:00",
    discount_id: "discount_id_1",
    discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
    updated_at: "2021-12-28T02:35:17.738471+00:00",
};

const updatedDiscount = {
    name: "Updated Discount name",
    discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
    discount_amount_value: 50,
    available_from: "2021-12-28T02:35:17.738471+00:00",
    available_until: "2022-12-28T02:35:17.738471+00:00",
    created_at: "2021-12-28T02:35:17.738471+00:00",
    discount_id: "discount_id_2",
    discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
    updated_at: "2021-12-28T02:35:17.738471+00:00",
};

const billingSchedulePeriods = [
    {
        billing_schedule_id: "billing_schedule_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        name: "Billing Schedule Period 1",
        billing_date: "2022-05-01T00:00:00.000Z",
        start_date: "2022-05-04T00:00:00.000Z",
        end_date: "2022-06-04T00:00:00.000Z",
        billing_ratios: [],
    },
    {
        billing_schedule_id: "billing_schedule_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_2",
        name: "Billing Schedule Period 2",
        billing_date: "2022-06-01T00:00:00.000Z",
        start_date: "2022-06-04T00:00:00.000Z",
        end_date: "2022-07-04T00:00:00.000Z",
        billing_ratios: [],
    },
];

const billingRatios = [
    {
        billing_ratio_id: "billing_ratio_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_2",
        billing_ratio_numerator: 4,
        billing_ratio_denominator: 4,
        start_date: "2022-06-04T00:00:00",
        end_date: "2022-06-10T23:59:59",
    },
    {
        billing_ratio_id: "billing_ratio_id_2",
        billing_schedule_period_id: "billing_schedule_period_id_2",
        billing_ratio_numerator: 3,
        billing_ratio_denominator: 4,
        start_date: "2022-06-11T00:00:00",
        end_date: "2022-06-17T23:59:59",
    },
];

const billingSchedulePeriodsWithBillingRatios = [
    {
        billing_schedule_id: "billing_schedule_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        name: "Billing Schedule Period 1",
        billing_date: "2022-05-01T00:00:00.000Z",
        start_date: "2022-05-04T00:00:00.000Z",
        end_date: "2022-06-04T00:00:00.000Z",
        billing_ratios: [],
    },
    {
        billing_schedule_id: "billing_schedule_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_2",
        name: "Billing Schedule Period 2",
        billing_date: "2022-06-01T00:00:00.000Z",
        start_date: "2022-06-04T00:00:00.000Z",
        end_date: "2022-07-04T00:00:00.000Z",
        billing_ratios: billingRatios,
    },
];

const { currentCurrency: currency } = getCurrentCurrency();
const firstStudentIndex = 0;

const startDate = new Date("2022-05-01T00:00:00.000Z");
const effectiveDate = new Date("2022-05-20T00:00:00.000Z");

const updateOrderMockFormValues: ProductsFormValues = {
    product: updateProduct,
    material,
    productTax,
    productPrices,
    discount: originalDiscount,
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.ACTIVE,
        effectiveDate: effectiveDate,
        billItems: createMockRecurringMaterialBillingItem(),
        hasUpdate: false,
        reccuringDetails: {
            startDate: startDate.toISOString(),
            billingSchedulePeriods: billingSchedulePeriods,
        },
    },
    fee: undefined,
    packageEntity: undefined,
};

const updateFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: defaultMockOrderFormValues.students[firstStudentIndex].studentInfo,
                productFieldArrayItems: [updateOrderMockFormValues],
            },
        ],
        location: defaultMockOrderFormValues.location,
    },
};

const hasUpdateOrderMockFormValues: ProductsFormValues = {
    product: updateProduct,
    material,
    productTax,
    productPrices,
    discount: updatedDiscount,
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.ACTIVE,
        effectiveDate: effectiveDate,
        billItems: createMockRecurringMaterialBillingItem(),
        hasUpdate: true,
        reccuringDetails: {
            startDate: startDate.toISOString(),
            billingSchedulePeriods: billingSchedulePeriods,
        },
    },
    fee: undefined,
    packageEntity: undefined,
};

const hasUpdateFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: defaultMockOrderFormValues.students[firstStudentIndex].studentInfo,
                productFieldArrayItems: [hasUpdateOrderMockFormValues],
            },
        ],
        location: defaultMockOrderFormValues.location,
    },
};

const cancelledOrderMockFormValues: ProductsFormValues = {
    product: updateProduct,
    material,
    productTax,
    productPrices,
    discount: originalDiscount,
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.CANCELLED,
        effectiveDate: effectiveDate,
        billItems: createMockRecurringMaterialBillingItem(),
        hasUpdate: true,
        reccuringDetails: {
            startDate: startDate.toISOString(),
            billingSchedulePeriods: billingSchedulePeriods,
        },
    },
    fee: undefined,
    packageEntity: undefined,
};

const cancelledFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: defaultMockOrderFormValues.students[firstStudentIndex].studentInfo,
                productFieldArrayItems: [cancelledOrderMockFormValues],
            },
        ],
        location: defaultMockOrderFormValues.location,
    },
};

const cancelledOrderMockFormValuesWithProRatingDisabled: ProductsFormValues = {
    product: updateProductProRatingDisabled,
    material,
    productTax,
    productPrices,
    discount: originalDiscount,
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.CANCELLED,
        effectiveDate: effectiveDate,
        billItems: createMockRecurringMaterialBillingItem(),
        hasUpdate: true,
        reccuringDetails: {
            startDate: startDate.toISOString(),
            billingSchedulePeriods: billingSchedulePeriods,
        },
    },
    fee: undefined,
    packageEntity: undefined,
};

const cancelledFormOptionsWithProRatingDisabled: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: defaultMockOrderFormValues.students[firstStudentIndex].studentInfo,
                productFieldArrayItems: [cancelledOrderMockFormValuesWithProRatingDisabled],
            },
        ],
        location: defaultMockOrderFormValues.location,
    },
};

const hasUpdateOrderMockFormValuesWithBillingRatio: ProductsFormValues = {
    product: updateProduct,
    material,
    productTax,
    productPrices,
    discount: updatedDiscount,
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.ACTIVE,
        effectiveDate: effectiveDate,
        billItems: createMockRecurringMaterialBillingItem(),
        hasUpdate: true,
        reccuringDetails: {
            startDate: startDate.toISOString(),
            billingSchedulePeriods: billingSchedulePeriodsWithBillingRatios,
        },
    },
    fee: undefined,
    packageEntity: undefined,
};

const hasUpdateFormOptionsWithBillingRatio: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: defaultMockOrderFormValues.students[firstStudentIndex].studentInfo,
                productFieldArrayItems: [hasUpdateOrderMockFormValuesWithBillingRatio],
            },
        ],
        location: defaultMockOrderFormValues.location,
    },
};

const cancelledOrderMockFormValuesWithBillingRatio: ProductsFormValues = {
    product: updateProduct,
    material,
    productTax,
    productPrices,
    discount: originalDiscount,
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.CANCELLED,
        effectiveDate: effectiveDate,
        billItems: createMockRecurringMaterialBillingItem(),
        hasUpdate: true,
        reccuringDetails: {
            startDate: startDate.toISOString(),
            billingSchedulePeriods: billingSchedulePeriodsWithBillingRatios,
        },
    },
    fee: undefined,
    packageEntity: undefined,
};

const cancelledFormOptionsWithBillingRatio: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: defaultMockOrderFormValues.students[firstStudentIndex].studentInfo,
                productFieldArrayItems: [cancelledOrderMockFormValuesWithBillingRatio],
            },
        ],
        location: defaultMockOrderFormValues.location,
    },
};

const renderUpdateOrderUpcomingBillingSection = (
    useFormOptions: UseFormProps<OrderFormValues> = updateFormOptions
) => {
    return render(
        <TranslationProvider>
            <ProductExtensionPluginsProvider
                currency={currency}
                orderType={OrderType.ORDER_TYPE_UPDATE}
                notImplementedYetPlugins={updateOrderNotImplementedYetPlugins}
            >
                <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                    <UpcomingBillingSection studentIndex={firstStudentIndex} />
                </TestHookFormProvider>
            </ProductExtensionPluginsProvider>
        </TranslationProvider>
    );
};

describe("<UpcomingBillingSection /> Update Order Recurring Material", () => {
    const mockDate = new Date("2022-05-05T00:00:00.000Z");
    mockCurrentDateForUnitTests(mockDate);

    it("should display no information when no changes are made", () => {
        const wrapper = renderUpdateOrderUpcomingBillingSection();

        expect(wrapper.getByTestId("UpcomingBillingSection__noDataContainer")).toBeInTheDocument();
        expect(wrapper.getByText("No Information")).toBeInTheDocument();
    });

    it("should display adjustment billing item details when bill item has product update", () => {
        const wrapper = renderUpdateOrderUpcomingBillingSection(hasUpdateFormOptions);

        const { updateOrderDetails } = hasUpdateOrderMockFormValues;

        const billingItemDetails = generateRecurringMaterialAdjustmentUpcomingBillingItem({
            productFieldArrayItem: hasUpdateOrderMockFormValues,
            currency,
            orderStatus: updateOrderDetails!.orderStatus,
            adjustmentTag: "[Adjustment]",
        });
        expect(billingItemDetails).toHaveLength(1);

        const expectedValues = {
            adjustmentPrice: -40,
            formattedAdjustmentPrice: "-???40",
            productName: `[Adjustment] Update Order Product Testing - Billing Schedule Period 2`,
            billingDate: "2022/06/01",
        };

        const { productPrice, discountName } = billingItemDetails[0];
        expect(productPrice).toEqual(expectedValues.adjustmentPrice);
        expect(discountName).toBeUndefined();

        const upcomingBillingItem = wrapper.getByTestId("UpcomingBillingProduct__root");
        expect(within(upcomingBillingItem).getByText(expectedValues.productName));
        expect(within(upcomingBillingItem).getByText(expectedValues.formattedAdjustmentPrice));
        expect(within(upcomingBillingItem).getByText(expectedValues.billingDate));
    });

    it("should display adjustment billing item when item is cancelled", () => {
        const wrapper = renderUpdateOrderUpcomingBillingSection(cancelledFormOptions);

        const { updateOrderDetails } = cancelledOrderMockFormValues;

        const billingItemDetails = generateRecurringMaterialAdjustmentUpcomingBillingItem({
            productFieldArrayItem: cancelledOrderMockFormValues,
            currency,
            orderStatus: updateOrderDetails!.orderStatus,
            adjustmentTag: "[Adjustment]",
        });
        expect(billingItemDetails).toHaveLength(1);

        const expectedValues = {
            adjustmentPrice: -990,
            formattedAdjustmentPrice: "-???990",
            productName: `[Adjustment] Update Order Product Testing - Billing Schedule Period 2`,
            billingDate: "2022/06/01",
        };

        const { productPrice, discountName } = billingItemDetails[0];
        expect(productPrice).toEqual(expectedValues.adjustmentPrice);
        expect(discountName).toBeUndefined();

        const upcomingBillingItem = wrapper.getByTestId("UpcomingBillingProduct__root");
        expect(within(upcomingBillingItem).getByText(expectedValues.productName));
        expect(within(upcomingBillingItem).getByText(expectedValues.formattedAdjustmentPrice));
        expect(within(upcomingBillingItem).getByText(expectedValues.billingDate));
    });

    it("should display adjustment billing item when item is cancelled and pro rating disabled", () => {
        const wrapper = renderUpdateOrderUpcomingBillingSection(
            cancelledFormOptionsWithProRatingDisabled
        );

        const { updateOrderDetails } = cancelledOrderMockFormValuesWithProRatingDisabled;

        const billingItemDetails = generateRecurringMaterialAdjustmentUpcomingBillingItem({
            productFieldArrayItem: cancelledOrderMockFormValuesWithProRatingDisabled,
            currency,
            orderStatus: updateOrderDetails!.orderStatus,
            adjustmentTag: "[Adjustment]",
        });
        expect(billingItemDetails).toHaveLength(1);

        const expectedValues = {
            adjustmentPrice: 0,
            formattedAdjustmentPrice: "???0",
            productName: `[Adjustment] Update Order Product Testing - Billing Schedule Period 2`,
            billingDate: "2022/06/01",
        };

        const { productPrice, discountName } = billingItemDetails[0];
        expect(productPrice).toEqual(expectedValues.adjustmentPrice);
        expect(discountName).toBeUndefined();

        const upcomingBillingItem = wrapper.getByTestId("UpcomingBillingProduct__root");
        expect(within(upcomingBillingItem).getByText(expectedValues.productName));
        expect(within(upcomingBillingItem).getByText(expectedValues.formattedAdjustmentPrice));
        expect(within(upcomingBillingItem).getByText(expectedValues.billingDate));
    });

    it("should display adjustment billing item details when bill item with bill ratio has product update", () => {
        const wrapper = renderUpdateOrderUpcomingBillingSection(
            hasUpdateFormOptionsWithBillingRatio
        );

        const { updateOrderDetails } = hasUpdateOrderMockFormValuesWithBillingRatio;

        const billingItemDetails = generateRecurringMaterialAdjustmentUpcomingBillingItem({
            productFieldArrayItem: hasUpdateOrderMockFormValuesWithBillingRatio,
            currency,
            orderStatus: updateOrderDetails!.orderStatus,
            adjustmentTag: "[Adjustment]",
        });
        expect(billingItemDetails).toHaveLength(1);

        // Calculation
        // Billing ratio based on effective date: undefined
        // Old Price: (1000 * 1/1) - 10 = 990
        // New Price: 1000 - 50 = 950
        // Adjustment Price: 950 - 990 = -40

        const expectedValues = {
            adjustmentPrice: -40,
            formattedAdjustmentPrice: "-???40",
            productName: `[Adjustment] Update Order Product Testing - Billing Schedule Period 2`,
            billingDate: "2022/06/01",
        };

        const { productPrice, discountName } = billingItemDetails[0];
        expect(productPrice).toEqual(expectedValues.adjustmentPrice);
        expect(discountName).toBeUndefined();

        const upcomingBillingItem = wrapper.getByTestId("UpcomingBillingProduct__root");
        expect(within(upcomingBillingItem).getByText(expectedValues.productName));
        expect(within(upcomingBillingItem).getByText(expectedValues.formattedAdjustmentPrice));
        expect(within(upcomingBillingItem).getByText(expectedValues.billingDate));
    });

    it("should display adjustment billing item details when bill item with billing ratio is cancelled", () => {
        const wrapper = renderUpdateOrderUpcomingBillingSection(
            cancelledFormOptionsWithBillingRatio
        );

        const { updateOrderDetails } = cancelledOrderMockFormValuesWithBillingRatio;

        const billingItemDetails = generateRecurringMaterialAdjustmentUpcomingBillingItem({
            productFieldArrayItem: cancelledOrderMockFormValuesWithBillingRatio,
            currency,
            orderStatus: updateOrderDetails!.orderStatus,
            adjustmentTag: "[Adjustment]",
        });
        expect(billingItemDetails).toHaveLength(1);

        // Calculation
        // Billing ratio based on effective date: undefined
        // Old Price: (1000 * 1/1) - 10 = 990
        // Adjustment Price: -990

        const expectedValues = {
            adjustmentPrice: -990,
            formattedAdjustmentPrice: "-???990",
            productName: `[Adjustment] Update Order Product Testing - Billing Schedule Period 2`,
            billingDate: "2022/06/01",
        };

        const { productPrice, discountName } = billingItemDetails[0];
        expect(productPrice).toEqual(expectedValues.adjustmentPrice);
        expect(discountName).toBeUndefined();

        const upcomingBillingItem = wrapper.getByTestId("UpcomingBillingProduct__root");
        expect(within(upcomingBillingItem).getByText(expectedValues.productName));
        expect(within(upcomingBillingItem).getByText(expectedValues.formattedAdjustmentPrice));
        expect(within(upcomingBillingItem).getByText(expectedValues.billingDate));
    });
});
