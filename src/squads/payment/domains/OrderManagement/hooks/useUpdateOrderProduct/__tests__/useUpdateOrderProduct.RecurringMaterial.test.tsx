import { KeyProductTypes, KeyStudentProductStatus } from "src/squads/payment/constants/const";
import { Payment_GetManyStudentProductsByStudentProductIdsV2Query } from "src/squads/payment/service/fatima/fatima-types";
import { createMockUpdateProductDiscount } from "src/squads/payment/test-utils/mocks/discount";
import { mockUpdateProductRecurringMaterial } from "src/squads/payment/test-utils/mocks/order-form-update";
import { createMockOrderItemsListByStudentProductIds } from "src/squads/payment/test-utils/mocks/order-items";
import { createMockRecurringMaterialProductPrices } from "src/squads/payment/test-utils/mocks/recurring-products";
import {
    createMockRecurringMaterialBillingItem,
    mockUpdateProductFormRecurringMaterial,
    createMockBillingSchedulePeriodsForUpdateOrder,
} from "src/squads/payment/test-utils/mocks/recurring-products-update";
import { createMockStudentProducts } from "src/squads/payment/test-utils/mocks/student-product";
import { createMockGetManyTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { pick1stElement } from "src/squads/payment/utils/array";
import { getDateWithZeroMilliseconds } from "src/squads/payment/utils/date";

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

const mockProducts: ProductTypeQuery[] = [
    {
        product_id: "product_id_1",
        name: "Update Order Product Testing",
        product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
        tax_id: "tax_id_1",
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        billing_schedule_id: "billing_schedule_id_1",
        disable_pro_rating_flag: false,
        updated_at: "2021-12-28T02:35:17.738675+00:00",
        created_at: "2021-12-28T02:35:17.738675+00:00",
    },
];

const mockProductPrices = createMockRecurringMaterialProductPrices();
const mockProductMaterials = mockUpdateProductRecurringMaterial();
const mockProductTaxList = createMockGetManyTaxDataList();
const mockDiscounts = createMockUpdateProductDiscount();

const mockBillingItemDate = createMockRecurringMaterialBillingItem();
const mockOrderItemsData = createMockOrderItemsListByStudentProductIds();
const getMockBillingSchedulePeriods = createMockBillingSchedulePeriodsForUpdateOrder();
const mockStudentProducts = createMockStudentProducts();

const currentDate = new Date();
const afterCurrentDate = getDateWithZeroMilliseconds();
const beforeCurrentDate = getDateWithZeroMilliseconds();
afterCurrentDate.setDate(currentDate.getDate() + 1);
beforeCurrentDate.setDate(currentDate.getDate() - 1);

const mockStudentProductsGreaterThanCurrentDate: Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"] =
    [
        {
            approval_status: "approved",
            end_date: "2022-08-17T23:00:00+00:00",
            location_id: "location_id_1",
            product_id: "product_id_1",
            product_status: KeyStudentProductStatus.ORDERED,
            start_date: afterCurrentDate,
            student_id: "student_id_1",
            student_product_id: "student_product_id_1",
            upcoming_billing_date: "2022-01-17T23:00:00+00:00",
        },
    ];

const mockStudentProductsLessThanCurrentDate: Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"] =
    [
        {
            approval_status: "approved",
            end_date: "2022-08-17T23:00:00+00:00",
            location_id: "location_id_1",
            product_id: "product_id_1",
            product_status: KeyStudentProductStatus.ORDERED,
            start_date: beforeCurrentDate,
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
            data: [mockOrderItemsData[0]],
            isFetching: false,
        });
        (useProducts as jest.Mock).mockReturnValue({
            data: mockProducts,
            isFetching: false,
            isFetched: true,
        });
        (useProductMaterials as jest.Mock).mockReturnValue({
            data: [mockProductMaterials[0]],
            isFetching: false,
        });
        (useProductPrices as jest.Mock).mockReturnValue({
            data: mockProductPrices,
            isFetching: false,
        });
        (useTaxes as jest.Mock).mockReturnValue({
            data: [mockProductTaxList[0]],
            isFetching: false,
        });
        (useDiscounts as jest.Mock).mockReturnValue({
            data: mockDiscounts,
            isFetching: false,
        });
        (useBillingSchedulePeriodsByBillingScheduleIds as jest.Mock).mockReturnValue({
            data: getMockBillingSchedulePeriods,
            isFetching: false,
        });
        (useStudentProducts as jest.Mock).mockReturnValue({
            data: [mockStudentProducts[0]],
            isFetching: false,
        });
        (useBillItemsByStudentProductIds as jest.Mock).mockReturnValue({
            data: mockBillingItemDate,
            isFetching: false,
        });
    });

    it("should return default product with billing item with details when calling billing item", () => {
        const {
            result: {
                current: { updateOrderProducts },
            },
        } = renderHook(() => useUpdateOrderProduct(useUpdateOrderDefaultProductProps));

        const generatedEffectiveDate =
            pick1stElement(updateOrderProducts)?.updateOrderDetails?.effectiveDate;
        const mockUpdateOrderProduct = mockUpdateProductFormRecurringMaterial({
            startDate: mockStudentProducts[0].start_date,
            effectiveDate: generatedEffectiveDate ?? new Date(),
        });

        expect(mockUpdateOrderProduct).toEqual(updateOrderProducts);
        expect(onFinishFetchingData).toBeCalledWith(mockUpdateOrderProduct);
    });

    it("should return effective date equal to start date if starte date > current date", () => {
        (useStudentProducts as jest.Mock).mockReturnValue({
            data: mockStudentProductsGreaterThanCurrentDate,
            isFetching: false,
        });

        const {
            result: {
                current: { updateOrderProducts },
            },
        } = renderHook(() => useUpdateOrderProduct(useUpdateOrderDefaultProductProps));

        const generatedEffectiveDate =
            pick1stElement(updateOrderProducts)?.updateOrderDetails?.effectiveDate;

        expect(generatedEffectiveDate).toEqual(
            mockStudentProductsGreaterThanCurrentDate[0].start_date
        );
    });

    it("should return effective date equal to current date if current date > start date", () => {
        (useStudentProducts as jest.Mock).mockReturnValue({
            data: mockStudentProductsLessThanCurrentDate,
            isFetching: false,
        });

        const {
            result: {
                current: { updateOrderProducts },
            },
        } = renderHook(() => useUpdateOrderProduct(useUpdateOrderDefaultProductProps));

        const generatedEffectiveDate =
            pick1stElement(updateOrderProducts)?.updateOrderDetails?.effectiveDate;

        const effectiveDate = new Date(generatedEffectiveDate!).toDateString();
        expect(effectiveDate).toEqual(currentDate.toDateString());
    });
});
