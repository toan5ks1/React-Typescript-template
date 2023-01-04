import {
    KeyProductMaterialTypes,
    KeyProductTypes,
    KeyTaxCategoryTypes,
} from "src/squads/payment/constants/const";
import { groupProductsInfo } from "src/squads/payment/helpers/product";
import { Payment_GetProductPriceByProductIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { OrderDetailProductListFeeType } from "src/squads/payment/types/service/product-fee-types";
import { OrderDetailProductListMaterialType } from "src/squads/payment/types/service/product-material-types";
import { ProductPackageType } from "src/squads/payment/types/service/product-package-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useEnrollmentProductIds from "src/squads/payment/domains/OrderManagement/hooks/useEnrollmentProductIds";
import useEnrollmentProducts, {
    UseEnrollmentProductsProps,
    UseEnrollmentProductsReturn,
} from "src/squads/payment/domains/OrderManagement/hooks/useEnrollmentProducts/useEnrollmentProducts";
import useProductFees from "src/squads/payment/domains/OrderManagement/hooks/useProductFees";
import useProductIdsByGradeAndLocation from "src/squads/payment/domains/OrderManagement/hooks/useProductIdsByGradeAndLocation";
import useProductMaterials from "src/squads/payment/domains/OrderManagement/hooks/useProductMaterials";
import useProductPackages from "src/squads/payment/domains/OrderManagement/hooks/useProductPackages";
import useProductPrices from "src/squads/payment/domains/OrderManagement/hooks/useProductPrices";
import useProducts from "src/squads/payment/domains/OrderManagement/hooks/useProducts";
import useTaxes from "src/squads/payment/domains/OrderManagement/hooks/useTaxes";

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useProductIdsByGradeAndLocation",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useEnrollmentProductIds", () => ({
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

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductPackages", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const defaultProductId = 1;

const useEnrollmentProductsProps: UseEnrollmentProductsProps = {
    gradeIds: [1],
    locationIds: ["1"],
};

const mockEnrollmentProductIds = [defaultProductId];
const mockProductIdsByGradeAndLocation = [defaultProductId];
const mockProductMaterials: OrderDetailProductListMaterialType[] = [
    {
        material_id: "material_id_1",
        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
    },
];
const mockProducts: ProductTypeQuery[] = [
    {
        product_id: "product_id_1",
        name: "Product package",
        product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
        tax_id: "tax_id_1",
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        remarks: "Remark 1",
        billing_schedule_id: "billing_schedule_id_1",
        disable_pro_rating_flag: false,
        updated_at: "2021-12-28T02:35:17.738675+00:00",
        created_at: "2021-12-28T02:35:17.738675+00:00",
    },
];
const mockProductFees: OrderDetailProductListFeeType[] = [];
const mockProductPackages: ProductPackageType[] = [];
const mockProductPrices: Payment_GetProductPriceByProductIdQuery["product_price"] = [
    {
        billing_schedule_period_id: "billing_schedule_period_id_1",
        created_at: "2021-12-28T02:35:18.03406+00:00",
        product_price_id: 2,
        price: 1000,
        product_id: "product_id_1",
        quantity: 10,
    },
];
const mockProductTaxList = [
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        tax_id: "tax_id_1",
    },
];

const mockProductsAfterGroup = groupProductsInfo({
    products: mockProducts,
    productPricesList: mockProductPrices,
    productTaxes: mockProductTaxList,
    materials: mockProductMaterials,
    fees: mockProductFees,
});

describe("useEnrollmentProducts should get enrollment products", () => {
    beforeEach(() => {
        (useProductIdsByGradeAndLocation as jest.Mock).mockReturnValue({
            productIds: mockProductIdsByGradeAndLocation,
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
        (useProductFees as jest.Mock).mockReturnValue({
            data: mockProductFees,
            isFetching: false,
        });
        (useProductPackages as jest.Mock).mockReturnValue({
            data: mockProductPackages,
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
    });

    it("should return enrollment products", () => {
        (useEnrollmentProductIds as jest.Mock).mockReturnValue({
            data: mockEnrollmentProductIds,
            isFetching: false,
        });

        const {
            result: {
                current: { data, isFetching },
            },
        }: RenderHookResult<UseEnrollmentProductsProps, UseEnrollmentProductsReturn> = renderHook(
            () => useEnrollmentProducts(useEnrollmentProductsProps)
        );

        expect(data).toEqual(mockProductsAfterGroup);
        expect(isFetching).toBeFalsy();
    });

    it("should return empty array when there is no enrollment product ids matches with product ids", () => {
        (useEnrollmentProductIds as jest.Mock).mockReturnValue({
            data: [],
            isFetching: false,
        });

        const {
            result: {
                current: { data, isFetching },
            },
        }: RenderHookResult<UseEnrollmentProductsProps, UseEnrollmentProductsReturn> = renderHook(
            () => useEnrollmentProducts(useEnrollmentProductsProps)
        );

        expect(data).toEqual([]);
        expect(isFetching).toBeFalsy();
    });
});
