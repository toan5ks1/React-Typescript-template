import ChapterForm, { ChapterFormProps } from "../ChapterForm";

import { fireEvent, screen, render } from "@testing-library/react";
import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

const renderUtil = (override: Partial<ChapterFormProps> = {}) => {
    const defaultProps: ChapterFormProps = {
        disableSubmit: false,
        onClose: jest.fn(),
        onOpen: jest.fn(),
        open: true,
        ...override,
    };

    return render(
        <TestThemeProvider>
            <TestHookFormProvider>
                <ChapterForm {...defaultProps} />
            </TestHookFormProvider>
        </TestThemeProvider>
    );
};

jest.mock("src/squads/syllabus/hooks/useBookDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(ChapterForm.name, () => {
    it("should display correct UI when visibleForm is passed", () => {
        const onCloseFn = jest.fn();
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: false,
        });

        renderUtil({
            onClose: onCloseFn,
        });

        expect(screen.getByTestId("TextFieldHF__input")).toBeInTheDocument();
        expect(screen.getByTestId("ChapterForm__submit")).toHaveAttribute("type", "submit");

        // should run cancel callback
        const cancel = screen.getByTestId("ChapterForm__cancel");
        fireEvent.click(cancel);
        expect(onCloseFn).toBeCalled();
    });

    it("should run callback when user interactive with add chapter button", () => {
        const onOpenFn = jest.fn();
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: false,
        });

        renderUtil({
            onOpen: onOpenFn,
            open: false,
        });

        // should trigger callback when click visible control
        const cancel = screen.getByTestId("ChapterForm__visibleFormControl");
        fireEvent.click(cancel);
        expect(onOpenFn).toBeCalled();
    });

    it("should disable submit button when pass disableSubmit is true", () => {
        (useBookDetail as jest.Mock).mockReturnValue(() => ({
            isDisableAction: false,
        }));

        renderUtil({
            disableSubmit: true,
        });

        expect(screen.getByTestId("ChapterForm__submit")).toBeDisabled();
    });

    it("shouldn't disable submit button when pass disableSubmit is false", () => {
        (useBookDetail as jest.Mock).mockReturnValue(() => ({
            isDisableAction: false,
        }));

        renderUtil({
            disableSubmit: false,
        });

        expect(screen.getByTestId("ChapterForm__submit")).not.toBeDisabled();
    });
});

describe(`${ChapterForm.name} disable all actions when the disabling value of config is true`, () => {
    it("should prevent user click to re-order and create when isDisableAction is true", () => {
        const onOpenFn = jest.fn();
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: true,
        });

        renderUtil({
            onOpen: onOpenFn,
            open: false,
        });

        const createButton = screen.getByTestId("ChapterForm__visibleFormControl");
        fireEvent.click(createButton);
        expect(onOpenFn).not.toBeCalled();
        expect(createButton).toBeDisabled();
    });
});
