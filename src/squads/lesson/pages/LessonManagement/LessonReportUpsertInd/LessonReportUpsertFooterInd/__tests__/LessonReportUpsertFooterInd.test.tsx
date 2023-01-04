import { TestThemeProvider } from "src/squads/lesson/test-utils";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LessonReportUpsertIndFooterInd, {
    LessonReportUpsertIndFooterIndProps,
} from "src/squads/lesson/pages/LessonManagement/LessonReportUpsertInd/LessonReportUpsertFooterInd";

describe("LessonReportUpsertIndFooterInd", () => {
    const props: LessonReportUpsertIndFooterIndProps = {
        onDiscard: jest.fn(),
        onSaveDraft: jest.fn(),
        onSubmitAll: jest.fn(),
        disableActions: {
            disableDiscard: false,
            disableSaveDraft: false,
            disableSubmitAll: false,
        },
    };

    const renderComponent = (overrideProps: Partial<LessonReportUpsertIndFooterIndProps> = {}) => {
        render(
            <TestThemeProvider>
                <LessonReportUpsertIndFooterInd {...props} {...overrideProps} />
            </TestThemeProvider>
        );

        const buttonDiscard = screen.getByTestId("LessonReportUpsertFooterInd__buttonDiscard");
        const buttonSaveDraft = screen.getByTestId("LessonReportUpsertFooterInd__buttonSaveDraft");
        const buttonSubmitAll = screen.getByTestId("LessonReportUpsertFooterInd__buttonSubmitAll");

        return { buttonDiscard, buttonSaveDraft, buttonSubmitAll };
    };

    it("should enable buttons", () => {
        const { buttonDiscard, buttonSaveDraft, buttonSubmitAll } = renderComponent();

        expect(buttonDiscard).toBeEnabled();
        expect(buttonSaveDraft).toBeEnabled();
        expect(buttonSubmitAll).toBeEnabled();

        userEvent.click(buttonDiscard);
        expect(props.onDiscard).toBeCalled();

        userEvent.click(buttonSaveDraft);
        expect(props.onSaveDraft).toBeCalled();

        userEvent.click(buttonSubmitAll);
        expect(props.onSubmitAll).toBeCalled();
    });

    it("should disable buttons", () => {
        const { buttonDiscard, buttonSaveDraft, buttonSubmitAll } = renderComponent({
            disableActions: {
                disableDiscard: true,
                disableSaveDraft: true,
                disableSubmitAll: true,
            },
        });

        expect(buttonDiscard).toBeDisabled();
        expect(buttonSaveDraft).toBeDisabled();
        expect(buttonSubmitAll).toBeDisabled();
    });
});
