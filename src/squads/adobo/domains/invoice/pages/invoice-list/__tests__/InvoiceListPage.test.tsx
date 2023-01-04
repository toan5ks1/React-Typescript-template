import {
    TestQueryWrapper,
    TestCommonAppProvider,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import { render, screen } from "@testing-library/react";
import InvoiceListPage from "src/squads/adobo/domains/invoice/pages/invoice-list/InvoiceListPage";

const renderComponent = () => {
    return render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <InvoiceListPage />
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
};

describe("<InvoiceListPage />", () => {
    it("should render correct UI", () => {
        renderComponent();

        expect(screen.getByTestId("InvoiceManagement__title")).toBeInTheDocument();
    });
});
