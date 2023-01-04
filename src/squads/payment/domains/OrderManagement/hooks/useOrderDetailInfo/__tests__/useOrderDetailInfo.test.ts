import {
    Payment_GetOrderByOrderIdQuery,
    Payment_GetOrderByOrderIdQueryVariables,
    Payment_GetLocationNameByLocationIdQuery,
    Payment_GetLocationNameByLocationIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { locationsService } from "src/squads/payment/service/fatima/locations-service/locations-service";
import { orderService } from "src/squads/payment/service/fatima/order-service/order-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockLocation } from "src/squads/payment/test-utils/mocks/location";
import { createMockOrderData } from "src/squads/payment/test-utils/mocks/order";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import { ArrayElement } from "src/squads/payment/types/common/array";

import useOrderDetailInfo from "../useOrderDetailInfo";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";

const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useFetchStudentInfo", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                data: mockStudent,
                isFetching: false,
            };
        },
    };
});

const mockOrder = createMockOrderData();
const mockLocations = createMockLocation();
const mockStudent = createMockStudentInfo();

describe("useOrderDetailInfo", () => {
    const std = mockWarner();

    it("should get order info data", () => {
        let callbackOrderRan = false;
        let callbackLocationRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "order" | "locations";
                    action:
                        | keyof typeof orderService["query"]
                        | keyof typeof locationsService["query"];
                }) =>
                () => {
                    switch (resource.entity) {
                        case "order":
                            if (!callbackOrderRan) {
                                callbackOrderRan = true;

                                return {
                                    data: mockOrder,
                                    isFetching: false,
                                };
                            }
                            break;

                        case "locations":
                            if (!callbackLocationRan) {
                                callbackLocationRan = true;

                                return {
                                    data: mockLocations,
                                    isFetching: false,
                                };
                            }
                            break;

                        default:
                            break;
                    }

                    return {
                        data: [],
                        isFetching: false,
                    };
                }
        );

        const { result } = renderHook(() =>
            useOrderDetailInfo({
                orderId: "order_id_1",
            })
        );

        expect(result.current.order).toEqual(mockOrder);
        expect(result.current.locations).toEqual(mockLocations);
        expect(result.current.student).toEqual(mockStudent);
    });

    it("should call onError when input invalid orderId", () => {
        let callbackRan = false;
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "order"; action: keyof typeof orderService["query"] }) =>
                (
                    _params: Payment_GetOrderByOrderIdQueryVariables,
                    options: UseQueryBaseOptions<
                        ArrayElement<Payment_GetOrderByOrderIdQuery["order"]> | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "order") {
                            callbackRan = true;

                            options.onError?.(Error("ERROR order - paymentGetOneOrderByOrderId"));

                            return {
                                data: undefined,
                                isFetching: false,
                            };
                        }
                    }

                    return {
                        data: [],
                        isFetching: false,
                    };
                }
        );

        renderHook(() =>
            useOrderDetailInfo({
                orderId: "",
            })
        );

        expect(mockShowSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData order - paymentGetOneOrderByOrderId",
            "error"
        );

        expect(std.warn).toBeCalledWith(
            "useOrderDetailInfo",
            Error("ERROR order - paymentGetOneOrderByOrderId")
        );
    });

    it("should call onError when order return undefined", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "order"; action: keyof typeof orderService["query"] }) =>
                (
                    _params: Payment_GetOrderByOrderIdQueryVariables,
                    options: UseQueryBaseOptions<
                        ArrayElement<Payment_GetOrderByOrderIdQuery["order"]> | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "order") {
                            callbackRan = true;

                            options.onError?.(Error("ERROR order - paymentGetOneOrderByOrderId"));

                            return {
                                data: undefined,
                                isFetching: false,
                            };
                        }
                    }

                    return {
                        data: [],
                        isFetching: false,
                    };
                }
        );

        renderHook(() =>
            useOrderDetailInfo({
                orderId: "order_id_1",
            })
        );

        expect(mockShowSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData order - paymentGetOneOrderByOrderId",
            "error"
        );

        expect(std.warn).toBeCalledWith(
            "useOrderDetailInfo",
            Error("ERROR order - paymentGetOneOrderByOrderId")
        );
    });

    it("should call onError when locations return undefined", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "locations"; action: keyof typeof locationsService["query"] }) =>
                (
                    _params: Payment_GetLocationNameByLocationIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | ArrayElement<Payment_GetLocationNameByLocationIdQuery["locations"]>
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "locations") {
                            callbackRan = true;
                            options.onError?.(
                                Error("ERROR locations - paymentGetLocationTitleByLocationId")
                            );
                        }
                    }

                    return {
                        data: [],
                        isFetching: false,
                    };
                }
        );

        renderHook(() =>
            useOrderDetailInfo({
                orderId: "order_id_1",
            })
        );

        expect(mockShowSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData locations - paymentGetLocationTitleByLocationId",
            "error"
        );

        expect(std.warn).toBeCalledWith(
            "useOrderDetailInfo",
            Error("ERROR locations - paymentGetLocationTitleByLocationId")
        );
    });
});
