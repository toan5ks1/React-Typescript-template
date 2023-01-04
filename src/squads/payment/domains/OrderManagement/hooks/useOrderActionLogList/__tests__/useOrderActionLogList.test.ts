import {
    UserNameByIdsQuery,
    UserNameByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { usersService } from "src/squads/payment/service/bob/users-service/users-service";
import {
    Payment_GetManyActionLogsByOrderIdQuery,
    Payment_GetManyActionLogsByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { orderActionLogService } from "src/squads/payment/service/fatima/order-action-log-service/order-action-log-service";
import { inferQuery, inferQueryPagination } from "src/squads/payment/service/infer-query";
import { createMockMappedUseOrderActionLogListData } from "src/squads/payment/test-utils/mocks/order-action-log";
import { createMockUsersList } from "src/squads/payment/test-utils/mocks/student";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import {
    UseQueryBaseOptions,
    DataWithTotal,
    UseQueryPaginationOptions,
} from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useOrderActionLogList, {
    MappedUseOrderActionLogListReturn,
} from "src/squads/payment/domains/OrderManagement/hooks/useOrderActionLogList";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/hooks/useShowSnackbar");

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQueryPagination: jest.fn(),
        inferQuery: jest.fn(),
    };
});

const mockMappedUseOrderActionLogListData = createMockMappedUseOrderActionLogListData();
const mockUsersList = createMockUsersList();
const pagination = createMockPaginationWithTotalObject();

const defaultMockInferQueryPaginationSelector = {
    data: mockMappedUseOrderActionLogListData.data.orderActionLogListData,
    total: 5,
};

const defaultMockInferQueryPaginationData = {
    data: mockMappedUseOrderActionLogListData.data,
    total: 5,
};

function mockInferQueryPagination(
    selector: DataWithTotal<
        Payment_GetManyActionLogsByOrderIdQuery["order_action_log"] | undefined
    > = defaultMockInferQueryPaginationSelector,
    data: DataWithTotal<
        MappedUseOrderActionLogListReturn | undefined
    > = defaultMockInferQueryPaginationData
) {
    let callbackRan = false;

    (inferQueryPagination as jest.Mock).mockImplementation(
        (resource: {
                entity: "orderActionLog";
                action: keyof typeof orderActionLogService["query"];
            }) =>
            (
                _params: Payment_GetManyActionLogsByOrderIdQueryVariables,
                options: UseQueryPaginationOptions<
                    DataWithTotal<
                        Payment_GetManyActionLogsByOrderIdQuery["order_action_log"] | undefined
                    >,
                    DataWithTotal<MappedUseOrderActionLogListReturn>
                >
            ) => {
                if (!callbackRan) {
                    if (resource.action === "paymentGetOrderActionLogListByOrderId") {
                        callbackRan = true;

                        options.selector?.(selector);

                        return {
                            result: {
                                isLoading: false,
                            },
                            data: data,
                            pagination,
                        };
                    }
                }
            }
    );
}

function mockInferQuery(users?: UserNameByIdsQuery["users"]) {
    let callbackRan = false;

    (inferQuery as jest.Mock).mockImplementation(
        (resource: { entity: "users"; action: keyof typeof usersService["query"] }) => () => {
            if (!callbackRan) {
                if (resource.action === "paymentGetTitleListByUserId") {
                    callbackRan = true;

                    return {
                        data: users,
                        isLoading: false,
                    };
                }
            }

            return {
                data: [],
                isLoading: false,
            };
        }
    );
}

describe("useOrderActionLogList", () => {
    const showSnackbar = jest.fn();

    const std = mockWarner();

    it("should get order action log list", () => {
        mockInferQueryPagination();
        mockInferQuery(mockUsersList);

        const { result } = renderHook(() =>
            useOrderActionLogList({
                orderId: "order_id_1",
            })
        );

        expect(result.current.mappedUseOrderActionLogListData).toEqual(
            mockMappedUseOrderActionLogListData
        );
        expect(result.current.usersList).toEqual(mockUsersList);
    });

    it("should call onError when order action log return undefined", () => {
        let callbackRan = false;

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferQueryPagination as jest.Mock).mockImplementation(
            (resource: {
                    entity: "orderActionLog";
                    action: keyof typeof orderActionLogService["query"];
                }) =>
                (
                    _params: Payment_GetManyActionLogsByOrderIdQueryVariables,
                    options: UseQueryPaginationOptions<
                        DataWithTotal<
                            Payment_GetManyActionLogsByOrderIdQuery["order_action_log"] | undefined
                        >,
                        DataWithTotal<MappedUseOrderActionLogListReturn>
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetOrderActionLogListByOrderId") {
                            callbackRan = true;

                            options.onError?.(
                                Error(
                                    "ERROR orderActionLog - paymentGetOrderActionLogListByOrderId"
                                )
                            );

                            return {
                                result: {
                                    isLoading: false,
                                },
                                data: undefined,
                                pagination,
                            };
                        }
                    }
                }
        );

        renderHook(() =>
            useOrderActionLogList({
                orderId: "order_id_1",
            })
        );

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData orderActionLog - paymentGetOrderActionLogListByOrderId",
            "error"
        );

        expect(std.warn).toBeCalledWith(
            "useOrderActionLogList",
            Error("ERROR orderActionLog - paymentGetOrderActionLogListByOrderId")
        );
    });

    it("should call onError when users return undefined", () => {
        let callbackRan = false;

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        mockInferQueryPagination();

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "users"; action: keyof typeof usersService["query"] }) =>
                (
                    _params: UserNameByIdsQueryVariables,
                    options: UseQueryBaseOptions<UserNameByIdsQuery["users"] | undefined>
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "users") {
                            callbackRan = true;
                            options.onError?.(Error("ERROR users - paymentGetTitleListByUserId"));

                            return {
                                data: undefined,
                                isLoading: false,
                            };
                        }
                    }

                    return {
                        data: [],
                        isLoading: false,
                    };
                }
        );

        renderHook(() =>
            useOrderActionLogList({
                orderId: "order_id_1",
            })
        );

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData users - paymentGetTitleListByUserId",
            "error"
        );

        expect(std.warn).toBeCalledWith(
            "useOrderActionLogList",
            Error("ERROR users - paymentGetTitleListByUserId")
        );
    });
});
