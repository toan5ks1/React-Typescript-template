import inferMutation from "src/squads/payment/service/infer-mutation";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import {
    VoidOrderReq,
    VoidOrderResp,
} from "src/squads/payment/service/payment/order-payment-service/types";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseMutationOptions, MutationParams } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useVoidOrderMutation from "src/squads/payment/domains/OrderManagement/hooks/useVoidOrderMutation/useVoidOrderMutation";

jest.mock("src/squads/payment/service/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockOrderId = "order_id_1";
const mockErrorMessage = "VOID ERROR";

const mockInferMutationSuccess = () => {
    (inferMutation as jest.Mock).mockImplementation(
        (resource: {
                entity: "orderPayment";
                action: keyof typeof orderPaymentService["mutation"];
            }) =>
            (options?: UseMutationOptions<MutationParams<VoidOrderReq>, VoidOrderResp>) => {
                switch (resource.action) {
                    case "paymentVoidOrder":
                        return {
                            mutate: async (params: MutationParams<VoidOrderReq>) => {
                                await options?.onSuccess?.(
                                    { orderId: mockOrderId, successful: true },
                                    params,
                                    undefined
                                );
                            },
                            isLoading: false,
                        };
                    default:
                        break;
                }

                return { mutate: jest.fn() };
            }
    );
};

const mockInferMutationError = () => {
    (inferMutation as jest.Mock).mockImplementation(
        (resource: {
                entity: "orderPayment";
                action: keyof typeof orderPaymentService["mutation"];
            }) =>
            (options?: UseMutationOptions<MutationParams<VoidOrderReq>, VoidOrderResp>) => {
                switch (resource.action) {
                    case "paymentVoidOrder":
                        return {
                            mutate: async (params: MutationParams<VoidOrderReq>) => {
                                await options?.onError?.(
                                    Error(mockErrorMessage),
                                    params,
                                    undefined
                                );
                            },
                        };
                    default:
                        break;
                }

                return { mutate: jest.fn() };
            }
    );
};

const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));

describe("useVoidOrderMutation call onSuccess", () => {
    it("should call snackbar with success message of onVoid", () => {
        const refetch = jest.fn();
        mockInferMutationSuccess();

        const {
            result: {
                current: { onVoid },
            },
        } = renderHook(() => useVoidOrderMutation({ refetch }));

        onVoid({ data: { orderId: mockOrderId } });

        expect(mockShowSnackbar).toHaveBeenCalledWith("resources.orders.message.success.voidOrder");
        expect(refetch).toBeCalled();
    });
});

describe("useVoidOrderMutation call onError", () => {
    const std = mockWarner();

    it("should call snackbar with error message on error of onVoid", () => {
        const refetch = jest.fn();
        mockInferMutationError();

        const {
            result: {
                current: { onVoid },
            },
        } = renderHook(() => useVoidOrderMutation({ refetch }));

        onVoid({ data: { orderId: mockOrderId } });

        expect(mockShowSnackbar).toBeCalledWith(mockErrorMessage, "error");
        expect(std.warn).toBeCalledWith(`Error useVoidOrderMutation: ${mockErrorMessage}`);
    });
});
