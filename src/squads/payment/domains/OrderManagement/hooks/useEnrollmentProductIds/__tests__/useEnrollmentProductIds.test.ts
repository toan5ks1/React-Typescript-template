import { Payment_GetEnrollmentProductIdsByProductIdsQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { productSettingService } from "src/squads/payment/service/fatima/product-setting-service/product-setting-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useEnrollmentProductIds, {
    UseEnrollmentProductIdsReturn,
} from "src/squads/payment/domains/OrderManagement/hooks/useEnrollmentProductIds";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const showSnackbar = jest.fn();

const mockEnrollmentProductId: ProductTypeQuery["product_id"] = "product_id_1";
const mockEnrollmentProductIds = [mockEnrollmentProductId];

describe("useEnrollmentProductIds", () => {
    const std = mockWarner();

    it("should return correct data", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productSetting";
                    action: keyof typeof productSettingService.query;
                }) =>
                (
                    _params: Payment_GetEnrollmentProductIdsByProductIdsQueryVariables,
                    options: UseQueryBaseOptions<UseEnrollmentProductIdsReturn | undefined>
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetEnrollmentProductIdsByProductIds") {
                            callbackRan = true;
                            options.selector?.(mockEnrollmentProductIds);
                            options.onSuccess?.(mockEnrollmentProductIds);

                            return {
                                data: mockEnrollmentProductIds,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const productIds: ProductTypeQuery["product_id"][] = [mockEnrollmentProductId];
        const { result } = renderHook(() => useEnrollmentProductIds({ productIds }));
        expect(result.current.data).toEqual(mockEnrollmentProductIds);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useEnrollmentProductIds");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productSetting";
                    action: keyof typeof productSettingService.query;
                }) =>
                (
                    _params: Payment_GetEnrollmentProductIdsByProductIdsQueryVariables,
                    options: UseQueryBaseOptions<UseEnrollmentProductIdsReturn | undefined>
                ) => {
                    if (resource.action === "paymentGetEnrollmentProductIdsByProductIds") {
                        options.onError?.(queryError);
                        options.selector?.(undefined);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const productIds: ProductTypeQuery["product_id"][] = [mockEnrollmentProductId];

        const { result } = renderHook(() => useEnrollmentProductIds({ productIds }));

        expect(std.warn).toBeCalledWith("useEnrollmentProductIds in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData productSetting - paymentGetEnrollmentProductIdsByProductIds",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
