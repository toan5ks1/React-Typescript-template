import { CreateOrder } from "src/squads/payment/service/fatima/order-service/types";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { createMockUpdateOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form-update";

import ProductExtensionPluginsProvider, {
    useProductPluginsContext,
} from "src/squads/payment/domains/OrderManagement/plugins/common/providers/ProductExtensionPluginsProvider";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { transformDataToCreateOrder } from "src/squads/payment/domains/OrderManagement/common/transformers";
import useOrderMutation, {
    UseOrderMutationProps,
} from "src/squads/payment/domains/OrderManagement/hooks/useOrderMutation/useOrderMutation";
import useSubmitOrder from "src/squads/payment/domains/OrderManagement/hooks/useSubmitOrder";

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useOrderMutation/useOrderMutation",
    () => {
        return {
            __esModule: true,
            default: jest.fn(),
        };
    }
);

const mockOnCreateErrorFn = jest.fn();
let isMutateLoading = false;
const mockOnCreateOrder = jest.fn();
const mockError = "CREATE ORDER ERROR";
const mockNewOrderFormValues = createMockCompleteOrderFormValues();
const mockUpdateOrderFormValues = createMockUpdateOrderFormValues();

describe("useSubmitOrder", () => {
    const {
        result: {
            current: { getProductPluginsMap },
        },
    } = renderHook(() => useProductPluginsContext(), {
        wrapper: ProductExtensionPluginsProvider,
    });

    beforeEach(() => {
        (useOrderMutation as jest.Mock).mockImplementation(
            ({ onCreateError }: UseOrderMutationProps) => {
                isMutateLoading = true;
                return {
                    onCreate: (data: CreateOrder) => {
                        isMutateLoading = false;
                        mockOnCreateOrder(data);
                        onCreateError(mockError);
                    },
                };
            }
        );
    });

    it("should render createOrder function for new order type", async () => {
        const transformedData = transformDataToCreateOrder(
            mockNewOrderFormValues,
            OrderType.ORDER_TYPE_NEW,
            getProductPluginsMap,
            "single-student-order"
        );

        const {
            result: {
                current: { createOrder },
            },
        } = renderHook(
            () =>
                useSubmitOrder({
                    orderType: OrderType.ORDER_TYPE_NEW,
                    onCreateError: mockOnCreateErrorFn,
                }),
            {
                wrapper: ProductExtensionPluginsProvider,
            }
        );

        createOrder(mockNewOrderFormValues);

        await waitFor(() => expect(isMutateLoading).toEqual(false));

        expect(mockOnCreateOrder).toBeCalledWith({
            data: transformedData,
        });
    });

    it("should render createOrder function for enrollment order type", async () => {
        const transformedData = transformDataToCreateOrder(
            mockNewOrderFormValues,
            OrderType.ORDER_TYPE_ENROLLMENT,
            getProductPluginsMap,
            "single-student-order"
        );

        const {
            result: {
                current: { createOrder },
            },
        } = renderHook(
            () =>
                useSubmitOrder({
                    orderType: OrderType.ORDER_TYPE_ENROLLMENT,
                    onCreateError: mockOnCreateErrorFn,
                }),
            {
                wrapper: ProductExtensionPluginsProvider,
            }
        );

        createOrder(mockNewOrderFormValues);

        await waitFor(() => expect(isMutateLoading).toEqual(false));

        expect(mockOnCreateOrder).toBeCalledWith({
            data: transformedData,
        });
    });

    it("should render createOrder function for update order", async () => {
        const transformedData = transformDataToCreateOrder(
            mockUpdateOrderFormValues,
            OrderType.ORDER_TYPE_UPDATE,
            getProductPluginsMap,
            "single-student-order"
        );

        const {
            result: {
                current: { createOrder },
            },
        } = renderHook(
            () =>
                useSubmitOrder({
                    orderType: OrderType.ORDER_TYPE_UPDATE,
                    onCreateError: mockOnCreateErrorFn,
                }),
            {
                wrapper: ProductExtensionPluginsProvider,
            }
        );

        createOrder(mockUpdateOrderFormValues);

        await waitFor(() => expect(isMutateLoading).toEqual(false));

        expect(mockOnCreateOrder).toBeCalledWith({
            data: transformedData,
        });
    });
});
