import DialogNotAllowDeleteClass, {
    DialogNotAllowDeleteClassProps,
} from "src/squads/syllabus/pages/Course/components/DialogNotAllowDeleteClass";
import TranslationProvider from "src/squads/syllabus/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassAssociation } from "src/squads/syllabus/pages/Course/hooks/useClassAssociation";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

describe("DialogNotAllowDeleteClass", () => {
    const exampleCases: ClassAssociation[] = [
        { lesson: true, student: false },
        { lesson: false, student: true },
        { lesson: true, student: true },
    ];

    it.each(exampleCases)("should render message by class associate", (example) => {
        const props: DialogNotAllowDeleteClassProps = {
            open: true,
            onClose: jest.fn(),
            classAssociation: example,
        };

        render(
            <TestThemeProvider>
                <TranslationProvider>
                    <DialogNotAllowDeleteClass {...props} />
                </TranslationProvider>
            </TestThemeProvider>
        );

        const studentAssociate = screen.queryByTestId(
            "DialogNotAllowDeleteClass__studentAssociate"
        );

        if (example.student) expect(studentAssociate).toBeInTheDocument();
        else expect(studentAssociate).not.toBeInTheDocument();

        const lessonAssociate = screen.queryByTestId("DialogNotAllowDeleteClass__lessonAssociate");

        if (example.lesson) expect(lessonAssociate).toBeInTheDocument();
        else expect(lessonAssociate).not.toBeInTheDocument();
    });

    it("should close dialog", () => {
        const props: DialogNotAllowDeleteClassProps = {
            open: true,
            onClose: jest.fn(),
            classAssociation: exampleCases[0],
        };

        render(
            <TestThemeProvider>
                <TranslationProvider>
                    <DialogNotAllowDeleteClass {...props} />
                </TranslationProvider>
            </TestThemeProvider>
        );

        expect(screen.queryByTestId("FooterDialogConfirm__buttonClose")).not.toBeInTheDocument();

        userEvent.click(screen.getByRole("button", { name: "Close" }));
        expect(props.onClose).toBeCalled();
    });
});
