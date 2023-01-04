import TranslationProvider from "src/providers/TranslationProvider";
import EnrollmentOrderDialogContainer, {
    EnrollmentOrderDialogContainerProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentOrderDialog/EnrollmentOrderDialogContainer";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockOnSave = jest.fn();
const mockOnClose = jest.fn();

jest.mock("src/squads/payment/hooks/useGoBackToRedirectUrl", () => {
    return {
        __esModule: true,
        default: () => mockOnClose,
    };
});

describe("<EnrollmentOrderDialogContainer />", () => {
    const enrollmentDialogContent = "Enrollment Dialog Content";
    const cancelConfirmDialogTitle = "Leave the page";
    const defaultProps: EnrollmentOrderDialogContainerProps = {
        isOpen: true,
        onSave: mockOnSave,
    };

    const TestDialog = () => {
        return (
            <TestThemeProvider>
                <TranslationProvider>
                    <TestApp>
                        <EnrollmentOrderDialogContainer {...defaultProps}>
                            <div>{enrollmentDialogContent}</div>
                        </EnrollmentOrderDialogContainer>
                    </TestApp>
                </TranslationProvider>
            </TestThemeProvider>
        );
    };

    it("should render enrollment order dialog container", () => {
        render(<TestDialog />);

        expect(screen.getByText("Create Enrollment Request")).toBeInTheDocument();
        expect(screen.getByText(enrollmentDialogContent)).toBeInTheDocument();
    });

    it("should render cancel confirm dialog when clicking button close", () => {
        render(<TestDialog />);

        expect(screen.getByTestId("DialogFullScreen__buttonClose")).toBeInTheDocument();
        userEvent.click(screen.getByTestId("DialogFullScreen__buttonClose"));

        expect(screen.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();
        expect(screen.getByText(cancelConfirmDialogTitle)).toBeInTheDocument();

        expect(screen.getByText("Leave")).toBeInTheDocument();
        userEvent.click(screen.getByText("Leave"));
        expect(mockOnClose).toBeCalled();
    });

    it("should render cancel confirm dialog when clicking Cancel button on default footer", async () => {
        render(<TestDialog />);

        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();

        userEvent.click(screen.getByText("Cancel"));
        expect(screen.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();
        expect(screen.getByText(cancelConfirmDialogTitle)).toBeInTheDocument();

        expect(screen.getByTestId("FooterDialogConfirm__buttonClose")).toBeInTheDocument();
        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        await waitFor(() => {
            expect(screen.queryByText(cancelConfirmDialogTitle)).not.toBeInTheDocument();
        });
    });

    it("should call mockOnSave when clicking Submit button on default footer", () => {
        render(<TestDialog />);

        expect(screen.getByText("Submit")).toBeInTheDocument();

        userEvent.click(screen.getByText("Submit"));
        expect(mockOnSave).toBeCalled();
    });
});
