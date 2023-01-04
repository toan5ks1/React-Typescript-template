import intersection from "lodash/intersection";
import {
    Payment_GetProductIdsByGradeIdsQuery,
    Payment_GetProductIdsByGradeIdsQueryVariables,
    Payment_GetProductIdsByLocationIdsQuery,
    Payment_GetProductIdsByLocationIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { productGradeService } from "src/squads/payment/service/fatima/product-grade-service/product-grade-service";
import { productLocationService } from "src/squads/payment/service/fatima/product-location-service/product-location-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import {
    createMockGradeBasedProductIds,
    createMockLocationBasedProductIds,
} from "src/squads/payment/test-utils/mocks/products";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import useProductIdsByGradeAndLocation, {
    UseProductIdsByGradeAndLocationProps,
    UseProductIdsByGradeAndLocationReturn,
} from "../useProductIdsByGradeAndLocation";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

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

const mockLocationBasedProductIds = createMockLocationBasedProductIds();
const mockGradeBasedProductIds = createMockGradeBasedProductIds();
const mockGradeReturnData = mockGradeBasedProductIds.map((product) => product.product_id);
const mockLocationReturnData = mockLocationBasedProductIds.map((product) => product.product_id);

const defaultUseProductIdsByGradeAndLocationProps: UseProductIdsByGradeAndLocationProps = {
    locationIds: ["location_id_1"],
    gradeIds: [1],
};
const useProductIdsByGradeAndLocationPropsWithUndefinedLocationIds: UseProductIdsByGradeAndLocationProps =
    {
        locationIds: undefined,
        gradeIds: [1],
    };
const useProductIdsByGradeAndLocationPropsWithUndefinedGradeIds: UseProductIdsByGradeAndLocationProps =
    {
        locationIds: ["location_id_1"],
        gradeIds: undefined,
    };

const showSnackbar = jest.fn();

describe("useProductIdsByGradeAndLocation get product_id list by location_id list and grade_id list", () => {
    const std = mockWarner();

    it("should return product_id list by location_id list and grade_id list", () => {
        let callbackGradeRan = false;
        let callbackLocationRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productGrade" | "productLocation";
                    action:
                        | keyof typeof productLocationService.query
                        | keyof typeof productGradeService.query;
                }) =>
                (
                    _params:
                        | Payment_GetProductIdsByGradeIdsQueryVariables
                        | Payment_GetProductIdsByLocationIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetProductIdsByGradeIdsQuery["product_grade"]
                        | Payment_GetProductIdsByLocationIdsQuery["product_location"]
                        | undefined,
                        ProductTypeQuery["product_id"][]
                    >
                ) => {
                    switch (resource.entity) {
                        case "productGrade":
                            if (!callbackGradeRan) {
                                callbackGradeRan = true;

                                options.selector?.(mockGradeBasedProductIds);

                                return {
                                    data: mockGradeReturnData,
                                    isFetching: false,
                                };
                            }

                            break;

                        case "productLocation":
                            if (!callbackLocationRan) {
                                callbackLocationRan = true;

                                options.selector?.(mockLocationBasedProductIds);

                                return {
                                    data: mockLocationReturnData,
                                    isFetching: false,
                                };
                            }

                            break;

                        default:
                            break;
                    }

                    return { data: [], isFetching: false };
                }
        );

        const {
            result: {
                current: { productIds },
            },
        }: RenderHookResult<
            UseProductIdsByGradeAndLocationProps,
            UseProductIdsByGradeAndLocationReturn
        > = renderHook(() =>
            useProductIdsByGradeAndLocation(defaultUseProductIdsByGradeAndLocationProps)
        );

        const productIdsResult = intersection(mockGradeReturnData, mockLocationReturnData);

        expect(productIds).toEqual(productIdsResult);
    });

    it("should log warning and show snackbar when the query product by grade fails", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productGrade";
                    action: keyof typeof productGradeService.query;
                }) =>
                (
                    _params: Payment_GetProductIdsByGradeIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetProductIdsByGradeIdsQuery["product_grade"] | undefined,
                        ProductTypeQuery["product_id"][]
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "productGrade") {
                            callbackRan = true;

                            options.onError?.(
                                Error("ERROR productGrade - paymentGetProductIdsByGradeIds")
                            );

                            return { data: [], isFetching: false };
                        }
                    }

                    return { data: [], isFetching: false };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderHook(() =>
            useProductIdsByGradeAndLocation(defaultUseProductIdsByGradeAndLocationProps)
        );

        expect(std.warn).toBeCalledWith(
            "useProductIdsByGradeAndLocation",
            Error("ERROR productGrade - paymentGetProductIdsByGradeIds")
        );
        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData productGrade - paymentGetProductIdsByGradeIds",
            "error"
        );
    });

    it("should log warning and show snackbar when the query product by location fails", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productLocation";
                    action: keyof typeof productLocationService.query;
                }) =>
                (
                    _params: Payment_GetProductIdsByLocationIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetProductIdsByLocationIdsQuery["product_location"] | undefined,
                        ProductTypeQuery["product_id"][]
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "productLocation") {
                            callbackRan = true;

                            options.onError?.(
                                Error("ERROR productLocation - paymentGetProductIdsByLocationIds")
                            );

                            return { data: [], isFetching: false };
                        }
                    }

                    return { data: [], isFetching: false };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderHook(() =>
            useProductIdsByGradeAndLocation(defaultUseProductIdsByGradeAndLocationProps)
        );

        expect(std.warn).toBeCalledWith(
            "useProductIdsByGradeAndLocation",
            Error("ERROR productLocation - paymentGetProductIdsByLocationIds")
        );
        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData productLocation - paymentGetProductIdsByLocationIds",
            "error"
        );
    });

    it("should return empty array if locationBasedProductIds is undefined", () => {
        let callbackGradeRan = false;
        let callbackLocationRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productGrade" | "productLocation";
                    action:
                        | keyof typeof productLocationService.query
                        | keyof typeof productGradeService.query;
                }) =>
                (
                    _params:
                        | Payment_GetProductIdsByGradeIdsQueryVariables
                        | Payment_GetProductIdsByLocationIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetProductIdsByGradeIdsQuery["product_grade"]
                        | Payment_GetProductIdsByLocationIdsQuery["product_location"]
                        | undefined,
                        ProductTypeQuery["product_id"][]
                    >
                ) => {
                    switch (resource.entity) {
                        case "productGrade":
                            if (!callbackGradeRan) {
                                callbackGradeRan = true;

                                options.selector?.(mockGradeBasedProductIds);

                                return {
                                    data: mockGradeReturnData,
                                    isFetching: false,
                                };
                            }

                            break;

                        case "productLocation":
                            if (!callbackLocationRan) {
                                callbackLocationRan = true;

                                options.selector?.(mockLocationBasedProductIds);

                                return {
                                    data: undefined,
                                    isFetching: false,
                                };
                            }

                            break;

                        default:
                            break;
                    }

                    return { data: undefined, isFetching: false };
                }
        );

        const {
            result: {
                current: { productIds },
            },
        } = renderHook(() =>
            useProductIdsByGradeAndLocation(defaultUseProductIdsByGradeAndLocationProps)
        );

        expect(productIds).toEqual([]);
    });
});

describe("useProductIdsByGradeAndLocation throws an error when locationIds and gradeIds are undefined", () => {
    const std = mockWarner();
    it("should log warning and show snackbar when gradeIds are undefined", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productGrade";
                    action: keyof typeof productGradeService.query;
                }) =>
                (
                    _params: Payment_GetProductIdsByGradeIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetProductIdsByGradeIdsQuery["product_grade"] | undefined,
                        ProductTypeQuery["product_id"][]
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "productGrade") {
                            callbackRan = true;

                            options.onError?.(
                                Error("ERROR productGrade - paymentGetProductIdsByGradeIds")
                            );

                            return { data: [], isFetching: false };
                        }
                    }

                    return { data: [], isFetching: false };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderHook(() =>
            useProductIdsByGradeAndLocation(
                useProductIdsByGradeAndLocationPropsWithUndefinedGradeIds
            )
        );

        expect(std.warn).toBeCalledWith(
            "useProductIdsByGradeAndLocation",
            Error("ERROR productGrade - paymentGetProductIdsByGradeIds")
        );
        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData productGrade - paymentGetProductIdsByGradeIds",
            "error"
        );
    });

    it("should log warning and show snackbar when locationIds are undefined", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productLocation";
                    action: keyof typeof productLocationService.query;
                }) =>
                (
                    _params: Payment_GetProductIdsByLocationIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetProductIdsByLocationIdsQuery["product_location"] | undefined,
                        ProductTypeQuery["product_id"][]
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "productLocation") {
                            callbackRan = true;

                            options.onError?.(
                                Error("ERROR productLocation - paymentGetProductIdsByLocationIds")
                            );

                            return { data: [], isFetching: false };
                        }
                    }

                    return { data: [], isFetching: false };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderHook(() =>
            useProductIdsByGradeAndLocation(
                useProductIdsByGradeAndLocationPropsWithUndefinedLocationIds
            )
        );

        expect(std.warn).toBeCalledWith(
            "useProductIdsByGradeAndLocation",
            Error("ERROR productLocation - paymentGetProductIdsByLocationIds")
        );
        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData productLocation - paymentGetProductIdsByLocationIds",
            "error"
        );
    });
});
