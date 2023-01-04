import {
    Payment_GetPackagesByProductIdsQuery,
    Payment_GetPackagesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { packageService } from "src/squads/payment/service/fatima/package-service/package-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockProductPackages } from "src/squads/payment/test-utils/mocks/products";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useProductPackages from "src/squads/payment/domains/OrderManagement/hooks/useProductPackages/useProductPackages";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const showSnackbar = jest.fn();

const mockProductPackages = createMockProductPackages();

describe("useProductPackages", () => {
    const std = mockWarner();

    it("should return correct data", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "productPackages"; action: keyof typeof packageService.query }) =>
                (
                    _params: Payment_GetPackagesByProductIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetPackagesByProductIdsQuery["package"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetManyProductPackagesByProductIds") {
                            callbackRan = true;

                            options.onSuccess?.(mockProductPackages);

                            return {
                                data: mockProductPackages,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const productIds: Array<ProductTypeQuery["product_id"]> = mockProductPackages.map(
            (item) => item.package_id
        );
        const { result } = renderHook(() => useProductPackages({ productIds }));
        expect(result.current.data).toEqual(mockProductPackages);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useProductPackages");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "productPackages"; action: keyof typeof packageService.query }) =>
                (
                    _params: Payment_GetPackagesByProductIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetPackagesByProductIdsQuery["package"] | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyProductPackagesByProductIds") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const productIds: Array<ProductTypeQuery["product_id"]> = mockProductPackages.map(
            (item) => item.package_id
        );

        const { result } = renderHook(() => useProductPackages({ productIds }));

        expect(std.warn).toBeCalledWith("useProductPackages in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData packageEntity - paymentGetManyProductPackagesByProductIds",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
