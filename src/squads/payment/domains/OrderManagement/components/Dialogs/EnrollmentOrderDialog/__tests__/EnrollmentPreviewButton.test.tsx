import EnrollmentPreviewButton from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentOrderDialog/EnrollmentPreviewButton";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";

const mockOnClick = jest.fn();

describe("<EnrollmentPreviewButton />", () => {
    const renderEnrollmentPreviewButton = () => {
        render(
            <TranslationProvider>
                <EnrollmentPreviewButton onClick={mockOnClick} />
            </TranslationProvider>
        );
    };

    it("should render correct content", () => {
        renderEnrollmentPreviewButton();

        expect(screen.getByText("View Enrollment Form")).toBeInTheDocument();
    });

    it("should call onClick when user clicks", () => {
        renderEnrollmentPreviewButton();

        userEvent.click(screen.getByText("View Enrollment Form"));
        expect(mockOnClick).toBeCalled();
    });
});
