import OrderDetailCommentDialog, {
    OrderDetailCommentDialogProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/OrderDetailCommentDialog";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";

const defaultOrderDetailCommentDialogProps: OrderDetailCommentDialogProps = {
    comment: "Test comment",
    open: true,
    onClose: jest.fn(),
};

const renderOrderDetailCommentDialog = (
    orderDetailCommentDialogProps: OrderDetailCommentDialogProps = defaultOrderDetailCommentDialogProps
) => {
    return render(
        <TestApp>
            <OrderDetailCommentDialog {...orderDetailCommentDialogProps} />
        </TestApp>
    );
};

describe("<OrderDetailCommentDialog />", () => {
    it("should render dialog, comment and View Comment title", () => {
        renderOrderDetailCommentDialog();

        expect(screen.getByTestId("OrderDetailCommentDialog__dialog")).toBeInTheDocument();
        expect(screen.getByTestId("OrderDetailCommentDialog__comment")).toBeInTheDocument();
        expect(screen.getByText("View Comment")).toBeInTheDocument();
        expect(screen.getByText(defaultOrderDetailCommentDialogProps.comment)).toBeInTheDocument();
    });

    it("should call onClose function when click close button", () => {
        renderOrderDetailCommentDialog();

        const closeButton = screen.getByTestId("OrderDetailCommentDialog__buttonClose");

        userEvent.click(closeButton);

        expect(defaultOrderDetailCommentDialogProps.onClose).toHaveBeenCalled();
    });

    it("should call onClose function when click exit button", () => {
        renderOrderDetailCommentDialog();

        const exitButton = screen.getByTestId("DialogWithHeaderFooter__buttonExit");

        userEvent.click(exitButton);
        expect(defaultOrderDetailCommentDialogProps.onClose).toHaveBeenCalled();
    });

    it("should not render order comment dialog when open is false", () => {
        renderOrderDetailCommentDialog({
            ...defaultOrderDetailCommentDialogProps,
            open: false,
        });
        expect(screen.queryByTestId("OrderDetailCommentDialog__dialog")).not.toBeInTheDocument();
    });
});
