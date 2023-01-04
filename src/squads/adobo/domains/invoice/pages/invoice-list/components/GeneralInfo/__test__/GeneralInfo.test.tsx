import { formatDate } from "src/common/utils/time";
import { InvoiceNumberCode } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { getMockInvoiceDetail } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import { getUsersMock } from "src/squads/adobo/domains/invoice/test-utils/mocks/users";
import {
    TestQueryWrapper,
    TestCommonAppProvider,
    TestThemeProvider,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import {
    GeneralInfo,
    GeneralInfoProps,
} from "src/squads/adobo/domains/invoice/pages/invoice-list/components/GeneralInfo";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen } from "@testing-library/react";

const mockInvoice = getMockInvoiceDetail();
const mockUser = getUsersMock()[0];

const renderComponent = (props: GeneralInfoProps) => {
    return render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <TestThemeProvider>
                    <MuiPickersUtilsProvider>
                        <GeneralInfo invoice={props.invoice} />
                    </MuiPickersUtilsProvider>
                </TestThemeProvider>
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
};

describe(GeneralInfo.name, () => {
    it("should have the same content as the mock data", () => {
        const props: GeneralInfoProps = {
            invoice: mockInvoice,
        };

        renderComponent(props);

        expect(screen.getByTestId("InvoiceGenInfo__invoiceNo")).toHaveTextContent(
            `${InvoiceNumberCode.INVOICE_CODE}-${mockInvoice?.invoice_sequence_number}`
        );
        expect(screen.getByTestId("InvoiceGenInfo__studentName")).toHaveTextContent(mockUser.name);
        expect(screen.getByTestId("InvoiceGenInfo__invoiceType")).toHaveTextContent(
            mockInvoice.type
        );
        expect(screen.getByTestId("InvoiceGenInfo__createdDate")).toHaveTextContent(
            formatDate(mockInvoice.created_at, "yyyy/LL/dd")
        );
    });
});
