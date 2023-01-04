import {
    Payment_GetManyMaterialsByProductIdsV2Query,
    Payment_GetManyMaterialsByProductIdsV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { materialService } from "src/squads/payment/service/fatima/material-service/material-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockProductMaterialListWithProductId } from "src/squads/payment/test-utils/mocks/products";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useProductMaterials from "src/squads/payment/domains/OrderManagement/hooks/useProductMaterials";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const showSnackbar = jest.fn();

const mockProductMaterialListWithProductId = createMockProductMaterialListWithProductId();

describe("useProductMaterials", () => {
    const std = mockWarner();

    it("should return correct data", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "material"; action: keyof typeof materialService.query }) =>
                (
                    _params: Payment_GetManyMaterialsByProductIdsV2QueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyMaterialsByProductIdsV2Query["material"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetManyProductMaterialsTypeByProductIds") {
                            callbackRan = true;

                            options.onSuccess?.(mockProductMaterialListWithProductId);

                            return {
                                data: mockProductMaterialListWithProductId,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const productIds = mockProductMaterialListWithProductId.map(
            (product) => product.material_id
        );
        const { result } = renderHook(() => useProductMaterials({ productIds }));
        expect(result.current.data).toEqual(mockProductMaterialListWithProductId);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useProductMaterials");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "material"; action: keyof typeof materialService.query }) =>
                (
                    _params: Payment_GetManyMaterialsByProductIdsV2QueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyMaterialsByProductIdsV2Query["material"] | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyProductMaterialsTypeByProductIds") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const productIds = mockProductMaterialListWithProductId.map(
            (product) => product.material_id
        );

        const { result } = renderHook(() => useProductMaterials({ productIds }));

        expect(std.warn).toBeCalledWith("useProductMaterials in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData material - paymentGetManyProductMaterialsTypeByProductIds",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
