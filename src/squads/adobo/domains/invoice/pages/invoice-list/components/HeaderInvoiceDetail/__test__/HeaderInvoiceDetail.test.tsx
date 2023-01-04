import { InvoiceNumberCode } from "src/squads/adobo/domains/invoice/common/constants/enum";
import {
    getMockIssuedInvoiceDetail,
    getMockInvoiceDetail,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import {
    TestCommonAppProvider,
    TestQueryWrapper,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";
import {
    HeaderInvoiceDetail,
    HeaderInvoiceProps,
} from "src/squads/adobo/domains/invoice/pages/invoice-list/components/HeaderInvoiceDetail";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => ({
    __esModule: true,
    default: () => (translateKey: string) => translateKey,
}));

jest.mock("src/hooks/useBreadcrumb", () => ({
    __esModule: true,
    default: () => ({
        breadcrumbs: [
            {
                url: `/invoice_management`,
                name: "resources.invoice.invoice_management.columns.invoiceNo",
            },
        ],
    }),
}));

jest.mock("src/squads/adobo/domains/invoice/hooks/useInvoiceFeatureFlag");

const renderComponent = (props: HeaderInvoiceProps) => {
    return render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <MuiPickersUtilsProvider>
                    <HeaderInvoiceDetail {...props} />
                </MuiPickersUtilsProvider>
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
};

const mockDraftInvoice = getMockInvoiceDetail();
const mockIssuedInvoice = getMockIssuedInvoiceDetail();
const mockStatusChange = jest.fn();

describe(HeaderInvoiceDetail.name, () => {
    const draftProps = {
        invoice: mockDraftInvoice,
        onStatusChange: mockStatusChange,
    };

    const issuedInvoiceProps = {
        invoice: mockIssuedInvoice,
        onStatusChange: mockStatusChange,
    };

    const cases = [
        ["Issue Invoice", draftProps, "actions.issueInvoice"],
        ["Void Invoice", draftProps, "actions.voidInvoice"],
        ["Approve Payment", issuedInvoiceProps, "actions.approvePayment"],
        ["Cancel Payment", issuedInvoiceProps, "actions.cancelPayment"],
    ];

    it("should render correct breadcrumb", () => {
        renderComponent(draftProps);
        expect(screen.queryByTestId("BreadcrumbItem")).toBeInTheDocument();
        expect(screen.queryByTestId("BreadcrumbItem")).toHaveAttribute(
            "href",
            "/invoice_management"
        );

        expect(screen.queryByTestId("Breadcrumbs__entityName")).toBeInTheDocument();
        expect(screen.getByTestId("Breadcrumbs__entityName")).toHaveTextContent(
            `${InvoiceNumberCode.INVOICE_CODE}-${mockDraftInvoice.invoice_sequence_number}`
        );
    });

    test.each(cases)(
        "should render %p Dialog when clicking in the Action Panel",
        async (_, componentProps, menuItem) => {
            renderComponent(componentProps as HeaderInvoiceProps);
            const btnAction = screen.getByTestId("ActionPanel__trigger");

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
