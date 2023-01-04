import {
    TestHookFormProvider,
    TestQueryWrapper,
} from "src/squads/adobo/domains/invoice/test-utils/providers";

import { RemarksForm } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Forms";
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
                    <RemarksForm />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </MuiPickersUtilsProvider>
    );
};

describe("<RemarksForm />", () => {
    beforeEach(() => {
        renderComponent();
    });

    it("should match snapshot", () => {
        expect(screen.queryByTestId("RemarksForm__form")).toMatchSnapshot();
    });

    it("should render remark input field", () => {
        expect(screen.getByTestId("RemarksForm__inputInvoiceRemark")).toBeInTheDocument();
    });
});
