import OrderDialogFooter, {
    OrderDialogFooterProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/OrderDialogFooter";

import { render } from "@testing-library/react";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const renderOrderDialogFooter = (
    props: OrderDialogFooterProps = {
        onCancel: jest.fn(),
        onSubmit: jest.fn(),
    }
) => {
    return render(
        <TestThemeProvider>
            <OrderDialogFooter {...props} />
        </TestThemeProvider>
    );
};

describe("<OrderDialogFooter/>", () => {
    it("should render dialog action buttons", () => {
        const wrapper = renderOrderDialogFooter();

        expect(wrapper.getByTestId("OrderDialogFooter__container")).toBeInTheDocument();
        expect(wrapper.getByTestId("OrderDialogFooter__buttonCancel")).toBeInTheDocument();
        expect(wrapper.getByTestId("OrderDialogFooter__buttonSubmit")).toBeInTheDocument();
    });
});
