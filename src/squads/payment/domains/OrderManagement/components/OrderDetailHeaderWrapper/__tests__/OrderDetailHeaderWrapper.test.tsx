import { KeyOrderStatus } from "src/squads/payment/constants/const";
import { VoidOrderReq } from "src/squads/payment/service/payment/order-payment-service/types";
import { createMockOrderData } from "src/squads/payment/test-utils/mocks/order";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import OrderDetailHeaderWrapper, {
    OrderDetailHeaderWrapperProps,
} from "src/squads/payment/domains/OrderManagement/components/OrderDetailHeaderWrapper/OrderDetailHeaderWrapper";

import {
    FeeType,
    MaterialType,
    PackageType,
    ProductType,
    QuantityType,
    StudentProductLabel,
} from "manabuf/payment/v1/enums_pb";
import { RetrieveListOfOrderDetailProductsResponse } from "manabuf/payment/v1/order_pb";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useOrderItemsInfoListV2 from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsInfoListV2";
import useVoidOrderMutation from "src/squads/payment/domains/OrderManagement/hooks/useVoidOrderMutation";
import useFeatureToggle from "src/squads/payment/hooks/useFeatureToggle";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useOrderItemsInfoListV2", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useVoidOrderMutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
jest.mock("src/squads/payment/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const mockOrder = createMockOrderData();
const defaultOrderDetailHeaderWrapperProps: OrderDetailHeaderWrapperProps = {
    order: mockOrder,
    orderId: "order_id_1",
    refetch: jest.fn(),
};
const renderOrderDetailHeaderWrapperComponent = (
    orderDetailHeaderWrapperProps: OrderDetailHeaderWrapperProps = defaultOrderDetailHeaderWrapperProps
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <OrderDetailHeaderWrapper {...orderDetailHeaderWrapperProps} />
            </TestQueryWrapper>
        </TestApp>
    );
};

const mockPagination = createMockPaginationWithTotalObject();
const mockOnVoidOrder = jest.fn();

describe("<OrderDetailHeaderWrapper />", () => {
    beforeEach(() => {
        (useOrderItemsInfoListV2 as jest.Mock).mockImplementation(() => ({
            isFetching: true,
            pagination: mockPagination,
        }));
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });
        (useVoidOrderMutation as jest.Mock).mockImplementation(() => {
            return {
                onVoid: (data: VoidOrderReq) => {
                    mockOnVoidOrder(data);
                },
            };
        });
    });

    const clickMenuItemPanel = () => {
        const menuItemPanel = screen.getByTestId("MenuItemPanel__trigger");
        expect(menuItemPanel).toBeInTheDocument();
        userEvent.click(menuItemPanel);
    };
    it("should render menu item panel with void order button", () => {
        renderOrderDetailHeaderWrapperComponent();
        clickMenuItemPanel();

        const voidButton = screen.getByText("Void");
        expect(voidButton).toBeInTheDocument();
    });

    const clickVoidButton = () => {
        clickMenuItemPanel();
        const voidButton = screen.getByText("Void");
        userEvent.click(voidButton);
    };
    it("should open dialog when void button is clicked", () => {
        renderOrderDetailHeaderWrapperComponent();
        clickVoidButton();

        const dialog = screen.getByTestId("DialogCancelConfirm__dialog");
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveTextContent("Void Order");
        expect(dialog).toHaveTextContent(
            "All updates to products and billing items in this order will be voided."
        );
    });

    it("should close dialog when cancel button is clicked", async () => {
        renderOrderDetailHeaderWrapperComponent();
        clickVoidButton();

        const dialog = screen.getByTestId("DialogCancelConfirm__dialog");
        expect(dialog).toBeInTheDocument();

        const cancelButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(cancelButton);
        await waitFor(() => expect(dialog).not.toBeInTheDocument());
    });

    it("should successfully call void order when confirm button is clicked", async () => {
        renderOrderDetailHeaderWrapperComponent();
        clickVoidButton();

        const confirmButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(confirmButton);

        expect(mockOnVoidOrder).toBeCalledWith({ data: { orderId: "order_id_1" } });
    });

    const mockOrderDataInvoiced: OrderDetailHeaderWrapperProps = {
        order: { ...mockOrder, order_status: KeyOrderStatus.ORDER_STATUS_INVOICED },
        orderId: "order_id_1",
        refetch: jest.fn(),
    };
    it("should see void order button disabled when status is invoiced", () => {
        renderOrderDetailHeaderWrapperComponent(mockOrderDataInvoiced);
        clickMenuItemPanel();

        const voidButton = screen.getByText("Void");
        expect(voidButton).toHaveAttribute("aria-disabled", "true");
    });

    const mockOrderDataVoided: OrderDetailHeaderWrapperProps = {
        order: { ...mockOrder, order_status: KeyOrderStatus.ORDER_STATUS_VOIDED },
        orderId: "order_id_1",
        refetch: jest.fn(),
    };
    it("should see void order button disabled when status is voided", () => {
        renderOrderDetailHeaderWrapperComponent(mockOrderDataVoided);
        clickMenuItemPanel();

        const voidButton = screen.getByText("Void");
        expect(voidButton).toHaveAttribute("aria-disabled", "true");
    });

    const defaultMockRetrieveOrderItems: RetrieveListOfOrderDetailProductsResponse.OrderProduct.AsObject =
        {
            index: 1,
            productId: "product_id_1",
            productName: "Product material",
            productType: ProductType.PRODUCT_TYPE_MATERIAL,
            packageType: PackageType.PACKAGE_TYPE_NONE,
            materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
            feeType: FeeType.FEE_TYPE_NONE,
            courseItemsList: [],
            discountInfo: {
                discountName: "Discount 1",
                discountId: "discount_id_1",
            },
            amount: 1000,
            quantityType: QuantityType.QUANTITY_TYPE_NONE,
            studentProductLabel: StudentProductLabel.UPDATE_SCHEDULED,
        };
    const mockRetrieveListOfOrderDetailWithUpdateSchedule: RetrieveListOfOrderDetailProductsResponse.AsObject =
        {
            itemsList: [defaultMockRetrieveOrderItems],
            nextPage: undefined,
            previousPage: undefined,
            totalItems: 5,
        };
    it("should see void order button disabled when the order contains a product with an update scheduled tag", () => {
        (useOrderItemsInfoListV2 as jest.Mock).mockImplementation(() => {
            return {
                data: mockRetrieveListOfOrderDetailWithUpdateSchedule,
            };
        });

        renderOrderDetailHeaderWrapperComponent();
        clickMenuItemPanel();

        const voidButton = screen.getByText("Void");
        expect(voidButton).toHaveAttribute("aria-disabled", "true");
    });

    const mockRetrieveListOfOrderDetailWithEffectiveDatePassed: RetrieveListOfOrderDetailProductsResponse.AsObject =
        {
            itemsList: [
                {
                    ...defaultMockRetrieveOrderItems,
                    startDate: {
                        seconds: 0,
                        nanos: 0,
                    },
                },
            ],
            nextPage: undefined,
            previousPage: undefined,
            totalItems: 5,
        };
    it("should see void order button disabled when effective date has passed", () => {
        (useOrderItemsInfoListV2 as jest.Mock).mockImplementation(() => {
            return {
                data: mockRetrieveListOfOrderDetailWithEffectiveDatePassed,
            };
        });

        renderOrderDetailHeaderWrapperComponent();
        clickMenuItemPanel();

        const voidButton = screen.getByText("Void");
        expect(voidButton).toHaveAttribute("aria-disabled", "true");
    });
});
