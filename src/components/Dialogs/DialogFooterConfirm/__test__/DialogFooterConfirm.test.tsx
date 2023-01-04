import { TestThemeProvider } from "src/test-utils";

import { DialogFooterConfirmProps } from "../../types";
import DialogFooterConfirm from "../DialogFooterConfirm";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const closeBtnTestId: string = "FooterDialogConfirm__buttonClose";
const saveBtnTestId: string = "FooterDialogConfirm__buttonSave";

describe("<DialogFooterConfirm />", () => {
    const props: DialogFooterConfirmProps = {
        onSave: jest.fn(),
        onClose: jest.fn(),
    };

    beforeEach(() => {
        render(
            <TestThemeProvider>
                <DialogFooterConfirm {...props} />
            </TestThemeProvider>
        );
    });

    it("should render correct actions button", () => {
        expect(screen.getByTestId(closeBtnTestId)).toBeInTheDocument();
        expect(screen.getByTestId(saveBtnTestId)).toBeInTheDocument();
    });

    it("should call the onClose callback", () => {
        userEvent.click(screen.getByTestId(closeBtnTestId));
        expect(props.onClose).toBeCalled();
    });

    it("should call the onOK callback", () => {
        userEvent.click(screen.getByTestId(saveBtnTestId));
        expect(props.onSave).toBeCalled();
    });
});
