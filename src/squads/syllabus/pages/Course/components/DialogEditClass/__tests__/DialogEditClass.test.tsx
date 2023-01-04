import DialogEditClass, {
    DialogEditClassProps,
} from "src/squads/syllabus/pages/Course/components/DialogEditClass";
import TranslationProvider from "src/squads/syllabus/providers/TranslationProvider";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

describe("DialogEditClass", () => {
    const props: DialogEditClassProps = {
        open: true,
        onClose: jest.fn(),
        onEditClass: jest.fn(),
        isEditing: false,
        classData: {
            class_id: "class_id_1",
            name: "Class Name 1",
            location: {
                location_id: "location_id_1",
                name: "Location Name 1",
            },
        },
    };

    beforeEach(() => {
        render(
            <TestThemeProvider>
                <TranslationProvider>
                    <DialogEditClass {...props} />
                </TranslationProvider>
            </TestThemeProvider>
        );
    });

    it("should close dialog edit class", async () => {
        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        await waitFor(() => {
            expect(props.onClose).toBeCalled();
        });
    });

    it("should only close dialog when edit without change class name", async () => {
        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));
        await waitFor(() => {
            expect(props.onClose).not.toBeCalled();
        });
        expect(props.onEditClass).not.toBeCalled();
    });

    it("should trigger edit dialog", async () => {
        const classNameInput = screen.getByTestId("DialogEditClass__textFieldClassName");
        userEvent.clear(classNameInput);
        userEvent.type(classNameInput, "class name test");

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));
        await waitFor(() => {
            expect(props.onEditClass).toBeCalledWith({
                ...props.classData,
                name: "class name test",
            });
        });
    });

    it("should alert field required with vacant class name", async () => {
        const classNameInput = screen.getByTestId("DialogEditClass__textFieldClassName");

        userEvent.clear(classNameInput);
        expect(classNameInput).toHaveValue("");

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        const formHelper = await screen.findByLabelText("TextFieldHF__formHelperText");

        expect(formHelper).toBeInTheDocument();
        expect(formHelper).toHaveTextContent("This field is required");
        expect(props.onEditClass).not.toBeCalled();
    });
});
