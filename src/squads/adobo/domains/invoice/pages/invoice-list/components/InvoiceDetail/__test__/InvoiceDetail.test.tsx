import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { getMockInvoiceDetail } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import { TestCommonAppProvider } from "src/squads/adobo/domains/invoice/test-utils/providers";
import { TestQueryWrapper } from "src/squads/adobo/domains/invoice/test-utils/react-hooks";

import InvoiceDetail from "../InvoiceDetail";

import { render, screen } from "@testing-library/react";
import useInvoiceDetailQuery, {
    InvoiceDetailReturn,
} from "src/squads/adobo/domains/invoice/hooks/useInvoiceDetailQuery";

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

jest.mock("src/squads/adobo/domains/invoice/hooks/useInvoiceDetailQuery", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const history = createMemoryHistory();
const mockInvoice = getMockInvoiceDetail();
const defaultInvoiceDetail: InvoiceDetailReturn = {
    invoice: mockInvoice,
    isFetching: false,
    refetch: jest.fn(),
};

const mockInvoiceDetailInfo = (
    useInvoiceDetailData: InvoiceDetailReturn = defaultInvoiceDetail
) => {
    (useInvoiceDetailQuery as jest.Mock).mockReturnValue(useInvoiceDetailData);
};

const renderComponent = () => {
    return render(
        <TestCommonAppProvider>
            <Router history={history}>
                <TestQueryWrapper>
                    <InvoiceDetail />
                </TestQueryWrapper>
            </Router>
        </TestCommonAppProvider>
    );
};

describe("<InvoiceDetail />", () => {
    beforeEach(() => {
        mockInvoiceDetailInfo();
    });

    it("should render InvoiceDetail component successfully", () => {
        renderComponent();
    });

    it("should render loading icon when data is fetching", () => {
        mockInvoiceDetailInfo({
            ...defaultInvoiceDetail,
            isFetching: true,
        });

        renderComponent();

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should return NotFound if invoice is undefined", () => {
        mockInvoiceDetailInfo({
            ...defaultInvoiceDetail,
            invoice: undefined,
        });

        renderComponent();

        expect(screen.getByTestId("InvoiceDetail__notfound")).toBeInTheDocument();
    });
});
