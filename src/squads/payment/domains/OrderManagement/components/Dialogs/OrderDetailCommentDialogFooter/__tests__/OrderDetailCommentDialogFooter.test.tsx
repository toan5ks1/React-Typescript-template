import OrderDetailCommentDialogFooter, {
    OrderDetailCommentDialogFooterProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/OrderDetailCommentDialogFooter";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";

const defaultOrderDetailCommentDialogFooterProps: OrderDetailCommentDialogFooterProps = {
    onClose: jest.fn(),
};

const renderOrderDetailCommentDialogFooter = (
    orderDetailCommentDialogFooterProps: OrderDetailCommentDialogFooterProps = defaultOrderDetailCommentDialogFooterProps
) => {
    return render(
        <TestApp>
            <OrderDetailCommentDialogFooter {...orderDetailCommentDialogFooterProps} />
        </TestApp>
    );
};

describe("<OrderDetailCommentDialogFooter />", () => {
    it("should render close button and footer", () => {
        renderOrderDetailCommentDialogFooter();

        expect(screen.getByTestId("OrderDetailCommentDialog__footer")).toBeInTheDocument();
        expect(screen.getByTestId("OrderDetailCommentDialog__buttonClose")).toBeInTheDocument();
        expect(screen.getByText("Close")).toBeInTheDocument();
    });

    it("should call onClose function when click close button", () => {
        renderOrderDetailCommentDialogFooter();

        userEvent.click(screen.getByTestId("OrderDetailCommentDialog__buttonClose"));

        expect(defaultOrderDetailCommentDialogFooterProps.onClose).toHaveBeenCalled();
    });
});
