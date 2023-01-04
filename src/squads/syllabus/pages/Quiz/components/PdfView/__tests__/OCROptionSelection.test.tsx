import { QuizState } from "src/squads/syllabus/store/quiz/quiz-types";
import { createEmptyQuizState, mockCreateQuiz } from "src/squads/syllabus/test-utils/quiz";

import OCROptionSelection, { OCROptionSelectionProps } from "../OCROptionSelection";
import { SelectFieldState } from "../enum";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";

type TestIdORCOptions = "OCROptionSelection__fieldType" | "OCROptionSelection__rectType";

const renderUtil = (customStore: QuizState["quizzes"], props: OCROptionSelectionProps) => {
    return render(
        <AppProvider
            customStores={{
                quiz: {
                    ...createEmptyQuizState(),
                    quizzes: customStore,
                },
            }}
        >
            <OCROptionSelection {...props} />
        </AppProvider>
    );
};

const testCasesOCROptions = [SelectFieldState.FIELD_TYPE, SelectFieldState.RECT_TYPE];

describe("<OCROptionSelection />", () => {
    test.each(testCasesOCROptions)(
        "should show correct OCR %p options and call its handler",
        (selectFieldState: SelectFieldState) => {
            const customStore = [mockCreateQuiz()];
            const mockOnSelectRectType = jest.fn();
            const mockOnSelectFieldType = jest.fn();
            const mockAnchorEl = document.createElement("div");
            const mockProps: OCROptionSelectionProps = {
                open: true,
                popperRef: () => {},
                anchorEl: mockAnchorEl,
                selectFieldState,
                onSelectRectType: mockOnSelectRectType,
                onSelectFieldType: mockOnSelectFieldType,
            };
            let testIdShowOCROptions: TestIdORCOptions = "OCROptionSelection__fieldType";
            let testIdHideOCROptions: TestIdORCOptions = "OCROptionSelection__rectType";
            let handledFn = mockOnSelectFieldType;
            let unhandledFn = mockOnSelectRectType;

            renderUtil(customStore, mockProps);

            if (selectFieldState === SelectFieldState.RECT_TYPE) {
                testIdShowOCROptions = "OCROptionSelection__rectType";
                testIdHideOCROptions = "OCROptionSelection__fieldType";
                handledFn = mockOnSelectRectType;
                unhandledFn = mockOnSelectFieldType;
            }

            expect(screen.getByTestId(testIdShowOCROptions)).toBeInTheDocument();
            expect(screen.queryByTestId(testIdHideOCROptions)).not.toBeInTheDocument();

            userEvent.click(
                screen
                    .getByTestId(testIdShowOCROptions)
                    .querySelector("button") as HTMLButtonElement
            );

            expect(handledFn).toBeCalled();
            expect(unhandledFn).not.toBeCalled();
        }
    );
});
