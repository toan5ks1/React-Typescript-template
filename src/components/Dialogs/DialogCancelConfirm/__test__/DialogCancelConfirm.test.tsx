import { DialogCancelConfirmProps } from "../../types";
import DialogCancelConfirm from "../DialogCancelConfirm";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import TestThemeProvider from "src/test-utils/TestThemeProvider";

describe("<DialogCancelConfirm /> ", () => {
    let wrapper: RenderResult;

    const props: DialogCancelConfirmProps = {
        onClose: jest.fn(),
        onSave: jest.fn(),
        open: true,
        title: "Cancel title",
        textCancelDialog: "Cancel text",
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <DialogCancelConfirm {...props} />
            </TestThemeProvider>
        );
    });

    it("should exist title", () => {
        expect(screen.getByText("Cancel title")).toBeInTheDocument();
    });

    it("should exist children", () => {
        expect(screen.getByText("Cancel text")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("DialogCancelConfirm__dialog")).toMatchSnapshot();
    });

    it("should call onSave function", () => {
        const confirmBtn = wrapper.getByTestId("FooterDialogConfirm__buttonSave");

        fireEvent.click(confirmBtn);
        expect(props.onSave).toBeCalled();
    });

    it("should call onClose function", () => {
        const closeBtn = wrapper.getByTestId("FooterDialogConfirm__buttonClose");

        fireEvent.click(closeBtn);
        expect(props.onClose).toBeCalled();
    });
});
