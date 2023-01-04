import {
    KeyBillingStatus,
    KeyDiscountAmountTypes,
    KeyDiscountTypes,
    KeyProductMaterialTypes,
    KeyProductTypes,
    KeyStudentProductStatus,
    KeyTaxCategoryTypes,
} from "src/squads/payment/constants/const";
import {
    Payment_GetManyBillItemsByStudentProductIdsV2Query,
    Payment_GetManyDiscountsByDiscountIdsQuery,
    Payment_GetManyOrderItemsByStudentProductIdsQuery,
    Payment_GetManyStudentProductsByStudentProductIdsV2Query,
    Payment_GetProductPriceByProductIdQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { mockUpdateProducts } from "src/squads/payment/test-utils/mocks/order-form-update";
import { OrderDetailProductListMaterialType } from "src/squads/payment/types/service/product-material-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { pick1stElement } from "src/squads/payment/utils/array";

import { renderHook } from "@testing-library/react-hooks";
import useBillItemsByStudentProductIds from "src/squads/payment/domains/OrderManagement/hooks/useBillItemsByStudentProductIds";
import useBillingSchedulePeriodsByBillingScheduleIds from "src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriodsByBillingScheduleIds";
import useDiscounts from "src/squads/payment/domains/OrderManagement/hooks/useDiscounts";
import useOrderItemsByStudentProductIds from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsByStudentProductIds";
import useProductMaterials from "src/squads/payment/domains/OrderManagement/hooks/useProductMaterials";
import useProductPrices from "src/squads/payment/domains/OrderManagement/hooks/useProductPrices";
import useProducts from "src/squads/payment/domains/OrderManagement/hooks/useProducts";
import useStudentProducts from "src/squads/payment/domains/OrderManagement/hooks/useStudentProducts";
import useTaxes from "src/squads/payment/domains/OrderManagement/hooks/useTaxes";
import useUpdateOrderProduct, {
    useUpdateOrderProductProps,
} from "src/squads/payment/domains/OrderManagement/hooks/useUpdateOrderProduct";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useBillItemsByStudentProductIds",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsByStudentProductIds",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProducts", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductMaterials", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductFees", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductPrices", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useTaxes", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProducts", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useDiscounts", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriodsByBillingScheduleIds",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useStudentProducts", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const onFinishFetchingData = jest.fn();

const getMockBilledData = (): Payment_GetManyBillItemsByStudentProductIdsV2Query["bill_item"] => {
    return [
        {
            product_id: "product_id_1",
            product_pricing: 1000,
            discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
            discount_amount_value: 10,
            tax_id: "tax_id_1",
            tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
            tax_percentage: 10,
            order_id: "order_id_1",
            billing_status: KeyBillingStatus.BILLING_STATUS_BILLED,
            billing_date: "2021-12-28T02:35:17.738471+00:00",
            billing_schedule_period_id: "billing_schedule_period_id_1",
            bill_item_sequence_number: 1,
            discount_amount: 10,
            tax_amount: 10,
            final_price: 990,
            billing_approval_status: KeyBillingStatus.BILLING_STATUS_BILLED,
            billing_item_description: "description",
            student_product_id: "student_product_id_1",
            is_latest_bill_item: true,
            price: 1000,
        },
    ];
};

const mockOrderItemsData: Payment_GetManyOrderItemsByStudentProductIdsQuery["order_item"] = [
    {
        product_id: "product_id_1",
        discount_id: "discount_id_1",
        student_product_id: "student_product_id_1",
        order_id: "order_id_1",
    },
];
const mockProductMaterials: OrderDetailProductListMaterialType[] = [
    {
        material_id: "product_id_1",
        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
    },
];
const mockProducts: ProductTypeQuery[] = [
    {
        product_id: "product_id_1",
        name: "Update Order Product Testing",
        product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
        tax_id: "tax_id_1",
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        billing_schedule_id: null,
        disable_pro_rating_flag: false,
        updated_at: "2021-12-28T02:35:17.738675+00:00",
        created_at: "2021-12-28T02:35:17.738675+00:00",
    },
];
const mockProductPrices: Payment_GetProductPriceByProductIdQuery["product_price"] = [
    {
        billing_schedule_period_id: null,
        created_at: "2023-02-11T11:02:07.616219+00:00",
        price: 100,
        product_id: "product_id_1",
        product_price_id: 1,
        quantity: 1,
    },
];
const mockProductTaxList = [
    {
        tax_id: "tax_id_1",
        tax_category: "TAX_CATEGORY_INCLUSIVE",
        tax_percentage: 10,
    },
];

const mockDiscounts: Payment_GetManyDiscountsByDiscountIdsQuery["discount"] = [
    {
        name: "Discount name",
        discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
        discount_amount_value: 10,
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        created_at: "2021-12-28T02:35:17.738471+00:00",
        discount_id: "discount_id_1",
        discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
        updated_at: "2021-12-28T02:35:17.738471+00:00",
    },
];

const mockStudentProducts: Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"] =
    [
        {
            approval_status: "approved",
            end_date: "2022-08-17T23:00:00+00:00",
            location_id: "location_id_1",
            product_id: "product_id_1",
            product_status: KeyStudentProductStatus.ORDERED,
            start_date: "2022-01-17T23:00:00+00:00",
            student_id: "student_id_1",
            student_product_id: "student_product_id_1",
            upcoming_billing_date: "2022-01-17T23:00:00+00:00",
        },
    ];

const useUpdateOrderDefaultProductProps: useUpdateOrderProductProps = {
    studentProductIds: ["student_product_id_1"],
    onFinishFetchingData,
};

describe("useUpdateOrderProduct with studentProductIds", () => {
    beforeEach(() => {
        (useOrderItemsByStudentProductIds as jest.Mock).mockReturnValue({
            data: mockOrderItemsData,
            isFetching: false,
        });
        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isFetching: false,
            isFetched: true,
        });
        (useProductMaterials as jest.Mock).mockReturnValue({
            data: mockProductMaterials,
            isFetching: false,
        });
        (useProductPrices as jest.Mock).mockReturnValue({
            data: mockProductPrices,
            isFetching: false,
        });
        (useTaxes as jest.Mock).mockReturnValue({
            data: mockProductTaxList,
            isFetching: false,
        });
        (useDiscounts as jest.Mock).mockReturnValue({
            data: mockDiscounts,
            isFetching: false,
        });
        (useBillingSchedulePeriodsByBillingScheduleIds as jest.Mock).mockReturnValue({
            data: [],
            isFetching: false,
        });
        (useStudentProducts as jest.Mock).mockReturnValue({
            data: mockStudentProducts,
            isFetching: false,
        });
    });

    it("should return default product with billing item details when calling billing item", () => {
        (useBillItemsByStudentProductIds as jest.Mock).mockReturnValue({
            data: getMockBilledData(),
            isFetching: false,
        });

        const {
            result: {
                current: { updateOrderProducts },
            },
        } = renderHook(() => useUpdateOrderProduct(useUpdateOrderDefaultProductProps));

        const generatedEffectiveDate =
            pick1stElement(updateOrderProducts)?.updateOrderDetails?.effectiveDate;
        const mockUpdateOrderProduct = mockUpdateProducts(generatedEffectiveDate);

        expect(mockUpdateOrderProduct).toEqual(updateOrderProducts);
        expect(onFinishFetchingData).toBeCalledWith(mockUpdateOrderProduct);
    });
});
