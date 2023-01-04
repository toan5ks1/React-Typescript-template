import { TestThemeProvider } from "src/squads/lesson/test-utils";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LessonReportUpsertFooterGrp, {
    LessonReportUpsertFooterGrpProps,
} from "src/squads/lesson/pages/LessonManagement/LessonReportUpsertGrp/LessonReportUpsertFooterGrp";

describe("LessonReportUpsertFooterGrp", () => {
    const props: LessonReportUpsertFooterGrpProps = {
        onCancel: jest.fn(),
        onSaveDraft: jest.fn(),
        onSubmitAll: jest.fn(),
        disableActions: {
            isDisableCancel: false,
            isDisableSaveDraft: false,
            isDisableSubmitAll: false,
        },
    };

    const renderComponent = (overrideProps: Partial<LessonReportUpsertFooterGrpProps> = {}) => {
        render(
            <TestThemeProvider>
                <LessonReportUpsertFooterGrp {...props} {...overrideProps} />
            </TestThemeProvider>
        );

        const buttonDiscard = screen.getByTestId("LessonReportUpsertFooterGrp__buttonCancel");
        const buttonSaveDraft = screen.getByTestId("LessonReportUpsertFooterGrp__buttonSaveDraft");
        const buttonSubmitAll = screen.getByTestId("LessonReportUpsertFooterGrp__buttonSubmitAll");

        return { buttonDiscard, buttonSaveDraft, buttonSubmitAll };
    };

    it("should enable buttons", () => {
        const { buttonDiscard, buttonSaveDraft, buttonSubmitAll } = renderComponent();

        expect(buttonDiscard).toBeEnabled();
        expect(buttonSaveDraft).toBeEnabled();
        expect(buttonSubmitAll).toBeEnabled();

        userEvent.click(buttonDiscard);
        expect(props.onCancel).toBeCalled();

        userEvent.click(buttonSaveDraft);
        expect(props.onSaveDraft).toBeCalled();

        userEvent.click(buttonSubmitAll);
        expect(props.onSubmitAll).toBeCalled();
    });

    it("should disable buttons", () => {
        const { buttonDiscard, buttonSaveDraft, buttonSubmitAll } = renderComponent({
            disableActions: {
                isDisableCancel: true,
                isDisableSaveDraft: true,
                isDisableSubmitAll: true,
            },
        });

        expect(buttonDiscard).toBeDisabled();
        expect(buttonSaveDraft).toBeDisabled();
        expect(buttonSubmitAll).toBeDisabled();
    });
});
