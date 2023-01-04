import {
    Payment_GetManyFeesByProductIdsQuery,
    Payment_GetManyMaterialsByProductIdsV2Query,
    Payment_GetManyPackageCourseFeesByPackageIdQuery,
    Payment_GetManyPackageCourseFeesByPackageIdQueryVariables,
    Payment_GetManyPackageCourseMaterialsByPackageIdQuery,
    Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables,
    Payment_GetManyProductPricesByProductIdsQuery,
    Payment_GetManyTaxesByTaxIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { feeService } from "src/squads/payment/service/fatima/fee-service/fee-service";
import { materialService } from "src/squads/payment/service/fatima/material-service/material-service";
import { packageCourseFeeService } from "src/squads/payment/service/fatima/package-course-fee-service/package-course-fee-service";
import { packageCourseMaterialService } from "src/squads/payment/service/fatima/package-course-material-service/package-course-material-service";
import { productPriceService } from "src/squads/payment/service/fatima/product-price-service/product-price-service";
import { productService } from "src/squads/payment/service/fatima/product-service/product-service";
import { taxService } from "src/squads/payment/service/fatima/tax-fatima-service/tax-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import {
    createMockPackageCourseFeeList,
    createMockPackageCourseMaterialList,
} from "src/squads/payment/test-utils/mocks/package-course";
import {
    createMockProductChoices,
    createMockProductFeeList,
    createMockProductMaterialList,
    createMockProductPriceList,
} from "src/squads/payment/test-utils/mocks/products";
import { createMockGetManyTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useAssociatedProducts, {
    UseAssociatedProductsProps,
    UseAssociatedProductsReturn,
} from "src/squads/payment/domains/OrderManagement/hooks/useAssociatedProducts";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const showSnackbar = jest.fn();

const useAssociatedProductsProps: UseAssociatedProductsProps = {
    productId: "product_id_1",
};

const mockPackageCourseFeeList = createMockPackageCourseFeeList();
const mockPackageCourseMaterialList = createMockPackageCourseMaterialList();
const mockProductChoices = createMockProductChoices();
const mockProductMaterial = createMockProductMaterialList();
const mockProductFee = createMockProductFeeList();
const mockProductPrice = createMockProductPriceList();
const mockProductTaxList = createMockGetManyTaxDataList();

describe(`useAssociatedProducts should get associated products`, () => {
    const std = mockWarner();

    it("should return material and fee associated products", () => {
        let callbackCourseMaterialRan = false;
        let callbackCourseFeeRan = false;
        let callbackProductsRan = false;
        let callbackTaxesRan = false;
        let callbackFeesRan = false;
        let callbackMaterialsRan = false;
        let callbackPricesRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity:
                        | "packageCourseMaterial"
                        | "packageCourseFee"
                        | "productPrice"
                        | "product"
                        | "tax"
                        | "fee"
                        | "material";
                    action:
                        | keyof typeof packageCourseFeeService.query
                        | keyof typeof packageCourseMaterialService.query
                        | keyof typeof productService.query
                        | keyof typeof productPriceService.query
                        | keyof typeof taxService.query
                        | keyof typeof feeService.query
                        | keyof typeof materialService.query;
                }) =>
                (
                    _params:
                        | Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables
                        | Payment_GetManyPackageCourseFeesByPackageIdQueryVariables,
                    _options: UseQueryBaseOptions<
                        | Payment_GetManyPackageCourseMaterialsByPackageIdQuery["package_course_material"]
                        | Payment_GetManyPackageCourseFeesByPackageIdQuery["package_course_fee"]
                        | Payment_GetManyProductPricesByProductIdsQuery["product_price"]
                        | Payment_GetManyTaxesByTaxIdsQuery["tax"]
                        | Payment_GetManyFeesByProductIdsQuery["fee"]
                        | Payment_GetManyMaterialsByProductIdsV2Query["material"]
                        | undefined
                    >
                ) => {
                    switch (resource.entity) {
                        case "packageCourseMaterial":
                            if (!callbackCourseMaterialRan) {
                                callbackCourseMaterialRan = true;

                                return {
                                    data: mockPackageCourseMaterialList,
                                    isFetched: true,
                                };
                            }

                            break;

                        case "packageCourseFee":
                            if (!callbackCourseFeeRan) {
                                callbackCourseFeeRan = true;

                                return {
                                    data: mockPackageCourseFeeList,
                                    isFetched: true,
                                };
                            }
                            break;

                        case "product":
                            if (!callbackProductsRan) {
                                callbackProductsRan = true;

                                return {
                                    data: mockProductChoices,
                                    isFetched: true,
                                };
                            }
                            break;

                        case "material":
                            if (!callbackMaterialsRan) {
                                callbackMaterialsRan = true;

                                return {
                                    data: mockProductMaterial,
                                    isFetched: true,
                                };
                            }
                            break;

                        case "fee":
                            if (!callbackFeesRan) {
                                callbackFeesRan = true;

                                return {
                                    data: mockProductFee,
                                    isFetched: true,
                                };
                            }
                            break;

                        case "tax":
                            if (!callbackTaxesRan) {
                                callbackTaxesRan = true;

                                return {
                                    data: mockProductTaxList,
                                    isFetched: true,
                                };
                            }
                            break;

                        case "productPrice":
                            if (!callbackPricesRan) {
                                callbackPricesRan = true;

                                return {
                                    data: mockProductPrice,
                                    isFetched: true,
                                };
                            }
                            break;

                        default:
                            break;
                    }

                    return { data: [], isFetched: true };
                }
        );

        const {
            result: {
                current: {
                    packageCourseMaterials,
                    packageCourseFees,
                    productDetails,
                    productFees,
                    productMaterials,
                    productPrices,
                    productTaxes,
                    isFetchedAll,
                },
            },
        }: RenderHookResult<UseAssociatedProductsProps, UseAssociatedProductsReturn> = renderHook(
            () => useAssociatedProducts(useAssociatedProductsProps)
        );

        expect(packageCourseFees).toEqual(mockPackageCourseFeeList);
        expect(packageCourseMaterials).toEqual(mockPackageCourseMaterialList);
        expect(productDetails).toEqual(mockProductChoices);
        expect(productFees).toEqual(mockProductFee);
        expect(productMaterials).toEqual(mockProductMaterial);
        expect(productPrices).toEqual(mockProductPrice);
        expect(productTaxes).toEqual(mockProductTaxList);
        expect(isFetchedAll).toBeTruthy();
    });

    it("should log warning and show snackbar when the query packageCourseFee fails", () => {
        const queryError = new Error("Error when query in useAssociatedProducts");
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "packageCourseMaterial";
                    action: keyof typeof packageCourseMaterialService.query;
                }) =>
                (
                    _params: Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetManyPackageCourseMaterialsByPackageIdQuery["package_course_material"]
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "packageCourseMaterial") {
                            callbackRan = true;
                            options.onError?.(queryError);

                            return { data: undefined, isFetching: false };
                        }
                    }

                    return { data: undefined, isFetching: false };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() => useAssociatedProducts(useAssociatedProductsProps));

        expect(std.warn).toBeCalledWith("useAssociatedProducts in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData packageCourseMaterial - paymentGetManyPackageCourseMaterialByPackageId",
            "error"
        );

        expect(result.current.packageCourseFees).toBeUndefined();
        expect(result.current.packageCourseMaterials).toBeUndefined();
    });

    it("should log warning and show snackbar when the query packageCourseMaterial fails", () => {
        const queryError = new Error("Error when query in useAssociatedProducts");
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "packageCourseFee";
                    action: keyof typeof packageCourseFeeService.query;
                }) =>
                (
                    _params: Payment_GetManyPackageCourseFeesByPackageIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetManyPackageCourseFeesByPackageIdQuery["package_course_fee"]
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "packageCourseFee") {
                            callbackRan = true;
                            options.onError?.(queryError);

                            return { data: undefined, isFetching: false };
                        }
                    }

                    return { data: undefined, isFetching: false };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() => useAssociatedProducts(useAssociatedProductsProps));

        expect(std.warn).toBeCalledWith("useAssociatedProducts in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData packageCourseFee - paymentGetManyPackageCourseFeesByPackageId",
            "error"
        );

        expect(result.current.packageCourseFees).toBeUndefined();
        expect(result.current.packageCourseMaterials).toBeUndefined();
    });
});
