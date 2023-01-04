import { formatDate } from "src/common/utils/time";
import {
    TestHookFormProvider,
    TestQueryWrapper,
} from "src/squads/adobo/domains/entry-exit/test-utils/providers";
import { FormIssueInvoiceValues } from "src/squads/adobo/domains/invoice/common/types/invoice";
import { getMockIssueInvoiceFormValues } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";

import MuiPickersUtilsProvider from "src/squads/adobo/domains/entry-exit/providers/MuiPickersUtilsProvider";
import IssueInvoiceForm from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Forms/IssueInvoiceForm";

import { render, screen } from "@testing-library/react";

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

const mockIssueInvoiceFormValues = getMockIssueInvoiceFormValues();

const { paymentMethod, dueDate, expiryDate, remarks } = mockIssueInvoiceFormValues;

const renderComponent = (defaultValues: FormIssueInvoiceValues = mockIssueInvoiceFormValues) => {
    return render(
        <MuiPickersUtilsProvider>
            <TestQueryWrapper>
                <TestHookFormProvider
                    useFormOptions={{
                        mode: "onChange",
                        defaultValues,
                    }}
                >
                    <IssueInvoiceForm />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </MuiPickersUtilsProvider>
    );
};

describe("<IssueInvoiceForm />", () => {
    it("should match snapshot", () => {
        renderComponent();
        const wrapper = renderComponent();

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render form elements correctly when supplied with values", () => {
        const getSelectElementByTestId = (testId: string) =>
            screen.getByTestId(testId).querySelector("input") as HTMLInputElement;

        renderComponent();

        const paymentMethodInput = getSelectElementByTestId(
            "FormIssueInvoice__selectPaymentMethod"
        );
        const dueDateInput = getSelectElementByTestId("FormIssueInvoice__inputInvoiceDueDate");
        const expiryDateInput = getSelectElementByTestId(
            "FormIssueInvoice__inputInvoiceExpiryDate"
        );
        const remarksInput = screen.getByTestId("FormIssueInvoice__inputInvoiceRemarks");

        expect(paymentMethodInput).toHaveValue(paymentMethod);

        expect(dueDateInput).toHaveValue(formatDate(dueDate as unknown as string, "yyyy/LL/dd"));

        expect(expiryDateInput).toHaveValue(
            formatDate(expiryDate as unknown as string, "yyyy/LL/dd")
        );

        expect(remarksInput).toHaveValue(remarks);
    });
});
