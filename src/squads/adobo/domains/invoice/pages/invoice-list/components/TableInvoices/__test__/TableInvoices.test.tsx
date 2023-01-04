import {
    InvoiceCurrency,
    InvoiceNumberCode,
} from "src/squads/adobo/domains/invoice/common/constants/enum";
import { getFormattedItemPrice } from "src/squads/adobo/domains/invoice/common/utils/currency";
import {
    getMockInvoicePagination,
    getMockInvoicesData,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import { getUsersMock } from "src/squads/adobo/domains/invoice/test-utils/mocks/users";
import { TestCommonAppProvider } from "src/squads/adobo/domains/invoice/test-utils/providers";

import TableInvoices, {
    TableInvoiceProps,
} from "src/squads/adobo/domains/invoice/pages/invoice-list/components/TableInvoices";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen } from "@testing-library/react";
import useGetUserName from "src/squads/adobo/domains/invoice/hooks/useGetUserName";

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => ({
    __esModule: true,
    default: () => (translateKey: string) => translateKey,
}));

jest.mock("src/squads/adobo/domains/invoice/hooks/useGetUserName", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const renderComponent = (props: TableInvoiceProps) => {
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <TableInvoices {...props} />
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

describe("<TableInvoices />", () => {
    const mockInvoices = getMockInvoicesData();
    const mockUsers = getUsersMock().slice(1);

    const props: TableInvoiceProps = {
        currency: InvoiceCurrency.JAPANESE_YEN,
        invoices: mockInvoices,
        isLoading: false,
        pagination: getMockInvoicePagination(mockInvoices.length),
    };

    beforeEach(() => {
        (useGetUserName as jest.Mock).mockImplementation(() => ({
            data: mockUsers,
            isLoading: false,
        }));
    });

    it("should match snapshot", () => {
        renderComponent(props);

        expect(screen.queryByTestId("TableInvoices__table")).toMatchSnapshot();
    });

    it("should show all columns have the same table content as the mock data", () => {
        const propsWithStudent: TableInvoiceProps = {
            currency: InvoiceCurrency.JAPANESE_YEN,
            invoices: [mockInvoices[0]],
            isLoading: false,
            pagination: getMockInvoicePagination(mockInvoices.length),
            studentId: "student_id_1",
        };
        renderComponent(propsWithStudent);

        expect(screen.getAllByTestId("InvoicesTableCell__columnInvoiceNo")[1]).toHaveTextContent(
            `${InvoiceNumberCode.INVOICE_CODE}-${mockInvoices[0].invoice_sequence_number}`
        );
        expect(
            screen.getAllByTestId("InvoicesTableCell__columnInvoiceStatus")[1]
        ).toHaveTextContent(mockInvoices[0].status);
        expect(screen.getAllByTestId("InvoicesTableCell__columnAmount")[1]).toHaveTextContent(
            getFormattedItemPrice(InvoiceCurrency.JAPANESE_YEN, false, mockInvoices[0].total)
        );
        //TODO: Add Payment columns
        expect(screen.getAllByTestId("InvoicesTableCell__columnInvoiceType")[1]).toHaveTextContent(
            mockInvoices[0].type
        );
    });
});
