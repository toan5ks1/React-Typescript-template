import { discountService } from "src/squads/payment/service/fatima/discount-service/discount-service";
import {
    Payment_GetManyDiscountsByDiscountIdsQuery,
    Payment_GetManyDiscountsByDiscountIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockDiscountList } from "src/squads/payment/test-utils/mocks/discount";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useDiscounts from "src/squads/payment/domains/OrderManagement/hooks/useDiscounts";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const showSnackbar = jest.fn();

const mockDiscountDetailList = createMockDiscountList();

describe("useDiscounts", () => {
    const std = mockWarner();
    it("should return correct data", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "discount"; action: keyof typeof discountService.query }) =>
                (
                    _params: Payment_GetManyDiscountsByDiscountIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyDiscountsByDiscountIdsQuery["discount"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetManyDiscountByDiscountIds") {
                            callbackRan = true;

                            options.onSuccess?.(mockDiscountDetailList);

                            return {
                                data: mockDiscountDetailList,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const discountIds = mockDiscountDetailList.map((discount) => discount.discount_id);
        const { result } = renderHook(() => useDiscounts({ discountIds }));
        expect(result.current.data).toEqual(mockDiscountDetailList);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useDiscounts");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "discount"; action: keyof typeof discountService.query }) =>
                (
                    _params: Payment_GetManyDiscountsByDiscountIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyDiscountsByDiscountIdsQuery["discount"] | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyDiscountByDiscountIds") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const discountIds = mockDiscountDetailList.map((discount) => discount.discount_id);

        const { result } = renderHook(() => useDiscounts({ discountIds }));

        expect(std.warn).toBeCalledWith("useDiscounts in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData discount - paymentGetManyDiscountByDiscountIds",
            "error"
        );
        expect(result.current.data).toBeUndefined();
    });
});
