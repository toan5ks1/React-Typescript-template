import EnrollmentPreviewFormDialogFooter, {
    EnrollmentPreviewFormDialogFooterProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentPreviewFormDialogFooter";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";

const defaultEnrollmentPreviewFormDialogFooterProps: EnrollmentPreviewFormDialogFooterProps = {
    closeEnrollmentForm: jest.fn(),
};

const renderEnrollmentPreviewFormDialogFooter = (
    orderDetailCommentDialogFooterProps: EnrollmentPreviewFormDialogFooterProps = defaultEnrollmentPreviewFormDialogFooterProps
) => {
    return render(
        <TestApp>
            <EnrollmentPreviewFormDialogFooter {...orderDetailCommentDialogFooterProps} />
        </TestApp>
    );
};

describe("<EnrollmentPreviewFormDialogFooter />", () => {
    it("should render close button and footer", () => {
        renderEnrollmentPreviewFormDialogFooter();

        expect(screen.getByTestId("EnrollmentPreviewFormDialog__footer")).toBeInTheDocument();
        expect(screen.getByTestId("EnrollmentForm__buttonBack")).toBeInTheDocument();
        expect(screen.getByText("Back")).toBeInTheDocument();
    });

    it("should call closeEnrollmentForm function when click close button", () => {
        renderEnrollmentPreviewFormDialogFooter();

        userEvent.click(screen.getByTestId("EnrollmentForm__buttonBack"));

        expect(
            defaultEnrollmentPreviewFormDialogFooterProps.closeEnrollmentForm
        ).toHaveBeenCalled();
    });
});
