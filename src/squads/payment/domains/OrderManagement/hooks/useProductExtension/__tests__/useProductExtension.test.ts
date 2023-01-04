import {
    Payment_GetFeeByProductIdQuery,
    Payment_GetFeeByProductIdQueryVariables,
    Payment_GetMaterialByProductIdQuery,
    Payment_GetMaterialByProductIdQueryVariables,
    Payment_GetPackageByProductIdQuery,
    Payment_GetPackageByProductIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { feeService } from "src/squads/payment/service/fatima/fee-service/fee-service";
import { materialService } from "src/squads/payment/service/fatima/material-service/material-service";
import { packageService } from "src/squads/payment/service/fatima/package-service/package-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import {
    createMockProductFeeList,
    createMockProductMaterialList,
    createMockProductPackageList,
} from "src/squads/payment/test-utils/mocks/products";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { ProductEntityType } from "src/squads/payment/types/service/product-types";

import useProductExtension, { UseProductExtensionProps } from "../useProductExtension";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const onSuccess = jest.fn();
const showSnackbar = jest.fn();

const productPackageProps: UseProductExtensionProps = {
    entity: "packageEntity",
    productId: "product_id_1",
    onSuccess,
};
const productMaterialProps: UseProductExtensionProps = {
    entity: "material",
    productId: "product_id_1",
    onSuccess,
};
const productFeeProps: UseProductExtensionProps = {
    entity: "fee",
    productId: "product_id_1",
    onSuccess,
};

const mockProductPackage = createMockProductPackageList()[0];
const mockProductMaterial = createMockProductMaterialList()[0];
const mockProductFee = createMockProductFeeList()[0];

const productExtensions = [
    {
        productProps: productPackageProps,
        mockData: mockProductPackage,
        action: "paymentGetOneProductPackageByProductId",
    },
    {
        productProps: productMaterialProps,
        mockData: mockProductMaterial,
        action: "paymentGetOneProductMaterialByProductId",
    },
    {
        productProps: productFeeProps,
        mockData: mockProductFee,
        action: "paymentGetOneProductFeeByProductId",
    },
];

describe(`useProductExtension should get results based on dynamic entity and action values`, () => {
    const std = mockWarner();

    test.each(productExtensions)(
        "should return entity %p based on product_id",
        ({ productProps, mockData }) => {
            let callbackRan = false;
            (inferQuery as jest.Mock).mockImplementation(
                (resource: {
                        entity: ProductEntityType;
                        action:
                            | keyof typeof packageService.query
                            | keyof typeof feeService.query
                            | keyof typeof materialService.query;
                    }) =>
                    (
                        _params:
                            | Payment_GetPackageByProductIdQueryVariables
                            | Payment_GetFeeByProductIdQueryVariables
                            | Payment_GetMaterialByProductIdQueryVariables,
                        options: UseQueryBaseOptions<
                            | ArrayElement<Payment_GetPackageByProductIdQuery["package"]>
                            | ArrayElement<Payment_GetFeeByProductIdQuery["fee"]>
                            | ArrayElement<Payment_GetMaterialByProductIdQuery["material"]>
                            | undefined
                        >
                    ) => {
                        if (resource.entity === productProps.entity) {
                            if (!callbackRan) {
                                callbackRan = true;

                                options.onSuccess?.(mockData);

                                return {
                                    data: mockData,
                                    isFetching: false,
                                };
                            }
                        }
                    }
            );

            const {
                result: {
                    current: { data: productExtensionData },
                },
            } = renderHook(() => useProductExtension(productProps));

            expect(productExtensionData).toEqual(mockData);
            expect(onSuccess).toBeCalledWith(mockData);
        }
    );

    test.each(productExtensions)(
        "should log warning and show snackbar when the query fails",
        ({ productProps, action }) => {
            const productError = Error(`${productProps.entity} error`);

            (inferQuery as jest.Mock).mockImplementation(
                (resource: {
                        entity: ProductEntityType;
                        action:
                            | keyof typeof packageService.query
                            | keyof typeof feeService.query
                            | keyof typeof materialService.query;
                    }) =>
                    (
                        _params:
                            | Payment_GetPackageByProductIdQueryVariables
                            | Payment_GetFeeByProductIdQueryVariables
                            | Payment_GetMaterialByProductIdQueryVariables,
                        options: UseQueryBaseOptions<
                            | ArrayElement<Payment_GetPackageByProductIdQuery["package"]>
                            | ArrayElement<Payment_GetFeeByProductIdQuery["fee"]>
                            | ArrayElement<Payment_GetMaterialByProductIdQuery["material"]>
                            | undefined
                        >
                    ) => {
                        if (resource.entity === productProps.entity) {
                            options.onError?.(productError);

                            return {
                                data: null,
                                isFetching: false,
                            };
                        }
                    }
            );

            (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

            renderHook(() => useProductExtension(productProps));

            expect(std.warn).toBeCalledWith(
                `useProductExtension - ${productProps.entity}`,
                productError
            );
            expect(showSnackbar).toBeCalledWith(
                `ra.message.unableToLoadData ${productProps.entity} - ${action}`,
                "error"
            );
        }
    );
});
