import {
    Payment_GetManyOrderItemsByStudentProductIdsQuery,
    Payment_GetManyOrderItemsByStudentProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { orderItemService } from "src/squads/payment/service/fatima/order-item-service/order-item-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockOrderItemsListByStudentProductIds } from "src/squads/payment/test-utils/mocks/order-items";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useOrderItemsByStudentProductIds, {
    useOrderItemsByStudentProductIdsProps,
} from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsByStudentProductIds";
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

const onSuccess = jest.fn();
const showSnackbar = jest.fn();

const useOrderItemsByStudentProductIdsDefaultProps: useOrderItemsByStudentProductIdsProps = {
    studentProductIds: ["student_product_id_1", "student_product_id_2"],
    onSuccess,
};

const mockOrderItemsData = createMockOrderItemsListByStudentProductIds();

describe("useOrderItemsByStudentProductIds", () => {
    const std = mockWarner();

    it("return order item list by studentProductIds", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "orderItem";
                    action: "paymentGetManyOrderItemsByStudentProductIds";
                }) =>
                (
                    _params: Payment_GetManyOrderItemsByStudentProductIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyOrderItemsByStudentProductIdsQuery["order_item"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.entity === "orderItem" &&
                            resource.action === "paymentGetManyOrderItemsByStudentProductIds"
                        ) {
                            callbackRan = true;
                            options.onSuccess?.(mockOrderItemsData);

                            return { data: mockOrderItemsData };
                        }
                    }

                    return { data: null };
                }
        );

        const {
            result: {
                current: { data },
            },
        } = renderHook(() =>
            useOrderItemsByStudentProductIds(useOrderItemsByStudentProductIdsDefaultProps)
        );

        expect(data).toEqual(mockOrderItemsData);

        expect(onSuccess).toBeCalledWith(mockOrderItemsData);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useOrderItemsByStudentProductIds");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "orderItem"; action: keyof typeof orderItemService.query }) =>
                (
                    _params: Payment_GetManyOrderItemsByStudentProductIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyOrderItemsByStudentProductIdsQuery["order_item"] | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyOrderItemsByStudentProductIds") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() =>
            useOrderItemsByStudentProductIds(useOrderItemsByStudentProductIdsDefaultProps)
        );

        expect(std.warn).toBeCalledWith(
            "useOrderItemsByStudentProductIds in Payment Order",
            queryError
        );

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData orderItem - paymentGetManyOrderItemsByStudentProductIds",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
