import ConfirmDialog from "../ConfirmDialog";

import { fireEvent, render } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

const onClose = jest.fn();

const renderComponent = () =>
    render(<ConfirmDialog onClose={onClose} open />, {
        wrapper: TestApp,
    });

describe(ConfirmDialog.name, () => {
    it("should render correct title", () => {
        const wrapper = renderComponent();

        const header = wrapper.getByTestId("DialogWithHeaderFooter__dialogTitle");

        expect(header.textContent).toBe("Change question type");
    });

    it("should render correct alert message", () => {
        const wrapper = renderComponent();

        const content = wrapper.getByTestId("DialogWithHeaderFooter__dialogContent");

        expect(content.textContent).toBe(
            "All your current input will be permanently deleted. Do you still want to change question type?"
        );
    });

    it("should render correct confirm button text", () => {
        const wrapper = renderComponent();

        const confirmBtn = wrapper.getByTestId("FooterDialogConfirm__buttonSave");

        expect(confirmBtn.textContent).toBe("Confirm");
    });

    it("should trigger onClose event on click cancel", () => {
        const wrapper = renderComponent();

        const closeBtn = wrapper.getByTestId("FooterDialogConfirm__buttonClose");
        fireEvent.click(closeBtn);

        expect(onClose).toBeCalled();
    });
});
