import { TestCommonAppProvider } from "src/squads/adobo/domains/invoice/test-utils/providers";

import { HeaderInvoiceList } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/HeaderInvoiceList/HeaderInvoiceList";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => ({
    __esModule: true,
    default: () => (translateKey: string) => translateKey,
}));

const renderComponent = () => {
    return render(
        <TestCommonAppProvider>
            <HeaderInvoiceList />
        </TestCommonAppProvider>
    );
};

describe(HeaderInvoiceList.name, () => {
    const cases = [["Scheduled Invoice History", "actions.scheduledInvoiceHistory"]];

    beforeEach(() => {
        renderComponent();
    });

    it("should have content", () => {
        expect(screen.queryByTestId("HeaderInvoiceList__root")).toBeInTheDocument();
        expect(screen.queryByTestId("InvoiceManagement__title")).toBeInTheDocument();
    });

    test.each(cases)(
        "should render %p Dialog when clicking in the Action Panel",
        async (_, menuItem) => {
            const btnAction = screen.getByTestId("ButtonInvoiceDropdown__iconButton");

            userEvent.click(btnAction);

            const btnMenuItem = screen.getByText(menuItem as string);

            expect(btnMenuItem).toBeInTheDocument();

            userEvent.click(btnMenuItem);

            await waitFor(() => {
                expect(screen.getByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();
            });
            expect(screen.queryByTestId("ActionPanel__menuList")).not.toBeInTheDocument();
        }
    );
});
