import StudentInvoice from "src/squads/adobo/domains/invoice/pages/student-invoice";
import {
    inferMutation,
    inferQueryPagination,
} from "src/squads/adobo/domains/invoice/services/infer-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";
import {
    getMockBillItemsData,
    getMockBillItemsPagination,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/bill-items";
import {
    getMockInvoicePagination,
    getMockInvoicePayload,
    getMockInvoicesData,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import { getLatestCallParams } from "src/squads/adobo/domains/invoice/test-utils/mocks/mock-utils";
import {
    TestQueryWrapper,
    TestCommonAppProvider,
    TestThemeProvider,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { InvoiceType } from "manabuf/invoicemgmt/v1/enums_pb";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useDialog from "src/squads/adobo/domains/invoice/hooks/useDialog";
import useGetUserName from "src/squads/adobo/domains/invoice/hooks/useGetUserName";
import useGenerateInvoices from "src/squads/adobo/domains/invoice/pages/student-invoice/hooks/useGenerateInvoices";

jest.mock("src/squads/adobo/domains/invoice/hooks/useDialog", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/adobo/domains/invoice/services/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
        inferQueryPagination: jest.fn(),
        inferQuery: jest.fn(),
    };
});

jest.mock(
    "src/squads/adobo/domains/invoice/pages/student-invoice/hooks/useGenerateInvoices",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("src/squads/adobo/domains/invoice/hooks/useGetUserName", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const studentId = "student_id_1";

const renderComponent = () => {
    return render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <TestThemeProvider>
                    <MuiPickersUtilsProvider>
                        <StudentInvoice studentId={studentId} />
                    </MuiPickersUtilsProvider>
                </TestThemeProvider>
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
};

const onOpenMock = jest.fn();
const onCloseMock = jest.fn();
const mockGenerateInvoices = jest.fn();
const mockRefetch = jest.fn();

describe("<StudentInvoice />", () => {
    const mockBillingItems = getMockBillItemsData();
    const mockInvoices = getMockInvoicesData();

    beforeEach(() => {
        (useGenerateInvoices as jest.Mock).mockImplementation(() => ({
            generateInvoices: mockGenerateInvoices,
        }));

        (inferQueryPagination as jest.Mock).mockImplementation(
            (__: { entity: "invoice"; action: "invoiceGetManyByStudentId" }) => () => {
                return {
                    result: {
                        isFetching: false,
                        refetch: mockRefetch,
                    },
                    data: mockInvoices,
                    pagination: getMockInvoicePagination(mockInvoices.length),
                };
            }
        );

        (useGetUserName as jest.Mock).mockImplementation(() => ({
            data: [],
            isLoading: false,
        }));
    });

    it("should render Invoice title and Student Invoices table", () => {
        (useDialog as jest.Mock).mockReturnValue({
            open: false,
            onOpen: onOpenMock,
            onClose: onCloseMock,
        });

        renderComponent();

        expect(screen.getByTestId("StudentInvoice__title")).toBeInTheDocument();
        expect(screen.getByTestId("TableInvoices__table")).toBeInTheDocument();
    });

    it("should open Create Invoice dialog box when Create Invoice button is clicked", () => {
        (useDialog as jest.Mock).mockReturnValue({
            open: false,
            onOpen: onOpenMock,
            onClose: onCloseMock,
        });

        renderComponent();

        const btnCreate = screen.getByTestId("StudentInvoice__btnCreate");
        userEvent.click(btnCreate);

        expect(onOpenMock).toHaveBeenCalled();
    });

    it("should close Create Invoice dialog box when close button is clicked", () => {
        (useDialog as jest.Mock).mockReturnValue({
            open: true,
            onOpen: onOpenMock,
            onClose: onCloseMock,
        });

        renderComponent();

        const btnCreate = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(btnCreate);

        expect(onCloseMock).toHaveBeenCalled();
    });

    it("should generate a new invoice", async () => {
        (inferQueryPagination as jest.Mock).mockImplementation(
            (__: { entity: "billItems"; action: "billItemsGetMany" }) => () => {
                return {
                    result: {
                        isFetching: false,
                        refetch: mockRefetch,
                    },
                    data: {
                        data: mockBillingItems,
                        total: mockBillingItems.length,
                    },
                    pagination: getMockBillItemsPagination(mockBillingItems.length),
                };
            }
        );

        const mockBillItemIdsList = [
            mockBillingItems[0].bill_item_sequence_number,
            mockBillingItems[1].bill_item_sequence_number,
        ];
        const mockSubTotal = mockBillingItems[0].final_price + mockBillingItems[1].final_price;
        const mockTotal = mockSubTotal;

        const mockResponse: NsInvoiceService.GenerateInvoicesResponse = {
            successful: true,
            errorsList: [],
        };

        const mockInvoicePayload: NsInvoiceService.GenerateInvoiceDetail =
            getMockInvoicePayload(studentId);
        mockInvoicePayload.billItemIdsList = mockBillItemIdsList;
        mockInvoicePayload.subTotal = mockSubTotal;
        mockInvoicePayload.total = mockTotal;

        const newInvoice: NsInvoiceService.GenerateInvoiceDetail = {
            studentId: studentId,
            billItemIdsList: mockBillItemIdsList,
            subTotal: mockSubTotal,
            total: mockTotal,
            invoiceType: InvoiceType.MANUAL,
        };

        (useDialog as jest.Mock).mockReturnValue({
            open: true,
            onOpen: onOpenMock,
            onClose: onCloseMock,
        });

        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "generateInvoice"; action: "CREATE" }) =>
                (
                    options: UseMutationOptions<
                        NsInvoiceService.GenerateInvoicesRequest,
                        NsInvoiceService.GenerateInvoicesResponse
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async () => {
                            await options?.onSuccess?.(
                                mockResponse,
                                {
                                    invoicesList: [newInvoice],
                                },
                                undefined
                            );
                        }),
                    };
                }
        );

        renderComponent();

        const checkboxHeader = screen
            .getByTestId("TableHeaderWithCheckbox__checkboxHeader")
            .querySelector("input") as HTMLInputElement;

        userEvent.click(checkboxHeader);

        const btnConfirm = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(btnConfirm);

        await waitFor(() => {
            expect(mockGenerateInvoices).toBeCalledWith([mockInvoicePayload], {
                onSuccess: expect.any(Function),
            });
            getLatestCallParams(mockGenerateInvoices)[1].onSuccess();
        });
    });
});

describe("<StudentInvoice /> empty Invoices table", () => {
    it("should render Invoice title and No Information message in Student Table", () => {
        (useGenerateInvoices as jest.Mock).mockImplementation(() => ({
            generateInvoices: mockGenerateInvoices,
        }));

        (inferQueryPagination as jest.Mock).mockImplementation(
            (__: { entity: "invoice"; action: "invoiceGetManyByStudentId" }) => () => {
                return {
                    result: {
                        isFetching: false,
                        refetch: mockRefetch,
                    },
                    data: [],
                    pagination: getMockBillItemsPagination(0),
                };
            }
        );

        (useGetUserName as jest.Mock).mockImplementation(() => ({
            data: [],
            isLoading: false,
        }));

        (useDialog as jest.Mock).mockReturnValue({
            open: false,
            onOpen: onOpenMock,
            onClose: onCloseMock,
        });

        renderComponent();

        expect(screen.getByTestId("StudentInvoice__title")).toBeInTheDocument();
        expect(screen.getByTestId("TableInvoices__table")).toBeInTheDocument();
        expect(screen.getByTestId("TableBase__noDataMessage")).toBeInTheDocument();
    });
});
