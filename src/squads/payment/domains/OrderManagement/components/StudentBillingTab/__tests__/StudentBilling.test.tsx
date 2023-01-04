import StudentBilling from "src/squads/payment/domains/OrderManagement/components/StudentBillingTab/StudentBilling";

import { render, screen } from "@testing-library/react";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const renderComponent = () => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <MuiPickersUtilsProvider>
                    <StudentBilling />
                </MuiPickersUtilsProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<StudentBilling />", () => {
    it("should render Billing Info title and student billing tables", () => {
        renderComponent();

        expect(screen.getByText("Billing Info")).toBeInTheDocument();

        expect(screen.getByText("Product List")).toBeInTheDocument();
        expect(screen.getByTestId("StudentBillingProductListTable__root")).toBeInTheDocument();
        expect(screen.getByText("Billing Items")).toBeInTheDocument();
        expect(screen.getByTestId("StudentBillingBillingItemsTable__root")).toBeInTheDocument();
        expect(screen.getByText("Orders History")).toBeInTheDocument();
        expect(screen.getByTestId("StudentBillingOrdersTable__root")).toBeInTheDocument();
    });
});
