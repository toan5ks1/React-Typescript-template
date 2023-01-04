import DialogDeleteClass, {
    DialogDeleteClassProps,
} from "src/squads/syllabus/pages/Course/components/DialogDeleteClass";
import TranslationProvider from "src/squads/syllabus/providers/TranslationProvider";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("@mui/material/styles", () => {
    return {
        __esModule: true,
        ...jest.requireActual("@mui/material/styles"),
    };
});

describe("DialogDeleteClass", () => {
    const props: DialogDeleteClassProps = {
        open: true,
        classData: {
            class_id: "Class_Id_1",
            name: "Class name 1",
            location: {
                location_id: "Location_Id_1",
                name: "Location name 1",
            },
        },
        onClose: jest.fn(),
        onDeleteClass: jest.fn(),
        isDeleting: false,
    };

    const renderComponent = () => {
        render(
            <TestThemeProvider>
                <TranslationProvider>
                    <DialogDeleteClass {...props} />
                </TranslationProvider>
            </TestThemeProvider>
        );
    };

    it("should trigger dialog delete class actions", async () => {
        renderComponent();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        await waitFor(() => {
            expect(props.onClose).toBeCalled();
        });

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));
        await waitFor(() => {
            expect(props.onDeleteClass).toBeCalled();
        });
    });
});
