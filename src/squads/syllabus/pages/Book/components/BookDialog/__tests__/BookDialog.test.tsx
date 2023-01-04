import BookDialog from "../BookDialog";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

describe("<BookDialog />", () => {
    const props = {
        title: "Dialog title",
        defaultValues: { name: "default value" },
        loading: false,
        open: true,
        onClose: jest.fn(),
        onSave: jest.fn(),
    };

    beforeEach(() => {
        render(
            <TestThemeProvider>
                <BookDialog {...props} />
            </TestThemeProvider>
        );
    });

    it("should render correctly", () => {
        expect(screen.getByTestId("TextFieldHF__input")).toHaveValue("default value");
    });

    it("should call onSave function", async () => {
        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));
        await waitFor(() => {
            expect(props.onSave).toHaveBeenCalled();
        });
    });

    it("should call onClose function", () => {
        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        expect(props.onClose).toHaveBeenCalled();
    });
});
