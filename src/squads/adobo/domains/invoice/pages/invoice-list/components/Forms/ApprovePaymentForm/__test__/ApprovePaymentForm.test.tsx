import {
    TestHookFormProvider,
    TestQueryWrapper,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import { ApprovePaymentForm } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Forms";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

import { render, screen } from "@testing-library/react";

jest.mock("src/squads/adobo/domains/invoice/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

const renderComponent = () => {
    return render(
        <MuiPickersUtilsProvider>
            <TestQueryWrapper>
                <TestHookFormProvider>
                    <ApprovePaymentForm />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </MuiPickersUtilsProvider>
    );
};

describe("<ApprovePaymentForm />", () => {
    beforeEach(() => {
        renderComponent();
    });

    it("should match snapshot", () => {
        expect(screen.queryByTestId("FormApprovePayment__form")).toMatchSnapshot();
    });

    it("should render UI correctly", () => {
        expect(screen.getByTestId("FormApprovePayment__inputPaymentDate")).toBeInTheDocument();
        expect(screen.getByTestId("FormApprovePayment__inputRemark")).toBeInTheDocument();
    });
});
