import DialogFooterConfirmStudyPlanItem from "..";

import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

type Props = Parameters<typeof DialogFooterConfirmStudyPlanItem>[0];

const defaultProps: Props = {
    textClose: "Close",
    textProceed: "Proceed",
    textSave: "Save",
    onClose: () => {},
    onProceed: () => {},
    onSave: () => {},
};
const renderUtil = (props?: Partial<Props>) =>
    render(
        <TestThemeProvider>
            <DialogFooterConfirmStudyPlanItem {...defaultProps} {...props} />
        </TestThemeProvider>
    );

describe(DialogFooterConfirmStudyPlanItem.name, () => {
    it("should render passed text correctly", () => {
        const { getByTestId } = renderUtil();
        const buttons = within(
            getByTestId("DialogFooterConfirmStudyPlanItem__dialogActions")
        ).getAllByRole("button");
        const { textClose, textProceed, textSave } = defaultProps;

        expect(buttons[0].textContent).toEqual(textProceed);
        expect(buttons[1].textContent).toEqual(textClose);
        expect(buttons[2].textContent).toEqual(textSave);
    });

    it("should call passed callbacks on corresponding button click", () => {
        const props: Partial<Props> = {
            onClose: jest.fn(),
            onProceed: jest.fn(),
            onSave: jest.fn(),
        };
        const { getByTestId } = renderUtil(props);
        const buttons = within(
            getByTestId("DialogFooterConfirmStudyPlanItem__dialogActions")
        ).getAllByRole("button");

        for (const button of buttons) {
            userEvent.click(button);
            expect(props[`on${button.textContent}`]).toHaveBeenCalled();
        }
    });
});
