import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { QuizType } from "src/squads/syllabus/models/quiz";

import QuizTypeSelect, { filterTypesByOnLOType } from "../QuizTypeSelect";

import { fireEvent, render, screen } from "@testing-library/react";
import TestQuizProvider, {
    TestQuizProviderProps,
} from "src/squads/syllabus/pages/QuizV2/test-utils/TestQuizProvider";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";
import { createTestLO, createTestQuiz } from "src/squads/syllabus/test-utils/quizV2";

const quizTypeConfigsByLOType = {
    [KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING]: [
        QuizType.QUIZ_TYPE_MCQ,
        QuizType.QUIZ_TYPE_FIB,
        QuizType.QUIZ_TYPE_MIQ,
        QuizType.QUIZ_TYPE_MAQ,
    ],
    [KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO]: [
        QuizType.QUIZ_TYPE_MCQ,
        QuizType.QUIZ_TYPE_FIB,
        QuizType.QUIZ_TYPE_MAQ,
    ],
};

const quizTypeForOtherLOTypes = [QuizType.QUIZ_TYPE_POW, QuizType.QUIZ_TYPE_TAD];

const getQuizTypeByLOType = (LOType: string) =>
    quizTypeConfigsByLOType[LOType] || quizTypeForOtherLOTypes;

const renderComponent = (props?: TestQuizProviderProps) => {
    const lo = props?.lo || createTestLO();
    return render(
        <TestApp>
            <TestQuizProvider {...props} lo={lo}>
                <TestHookForm
                    defaultValues={createTestQuiz({
                        loId: lo.lo_id,
                        kind: filterTypesByOnLOType(lo.type)[0],
                    })}
                >
                    <QuizTypeSelect />
                </TestHookForm>
            </TestQuizProvider>
        </TestApp>
    );
};

describe(QuizTypeSelect.name, () => {
    Object.keys(KeyLOTypes).forEach((LOType) => {
        const quizTypes = getQuizTypeByLOType(LOType);
        it(`should return quiz type are ${quizTypes} when LO type is ${LOType}`, () => {
            renderComponent({
                lo: createTestLO({
                    type: LOType as any,
                }),
            });

            fireEvent.mouseDown(screen.getByRole("button"));

            const options = screen.getAllByRole("option");

            expect(options).toHaveLength(quizTypes.length);

            options.forEach((option, index) => {
                expect(option).toHaveAttribute("data-value", `${quizTypes[index]}`);
            });
        });
    });

    it("should show confirm dialog on change type", () => {
        renderComponent({
            lo: createTestLO(),
        });

        fireEvent.mouseDown(screen.getByRole("button"));

        const options = screen.getAllByRole("option");
        const unselectedType = options.find(
            (option) => option.getAttribute("aria-selected") === "false"
        );

        expect(unselectedType).toBeTruthy();

        fireEvent.click(unselectedType!);

        expect(screen.getByTestId("QuizTypeSelect__confirmDialog")).toBeInTheDocument();
    });

    it("should keep current value on click cancel change", () => {
        renderComponent({
            lo: createTestLO(),
        });

        const typeSelect = screen.getByTestId("QuizTypeSelect__root");
        const input = typeSelect.querySelector("input");

        expect(input).toBeTruthy();

        const currentValue = input!.value;

        fireEvent.mouseDown(screen.getByRole("button"));

        const options = screen.getAllByRole("option");
        const unselectedType = options.find(
            (option) => option.getAttribute("aria-selected") === "false"
        );

        expect(unselectedType).toBeTruthy();

        fireEvent.click(unselectedType!);
        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));

        expect(typeSelect.querySelector("input")?.value).toBe(currentValue);
    });

    it("should change value on click confirm change", () => {
        renderComponent({
            lo: createTestLO(),
        });

        const typeSelect = screen.getByTestId("QuizTypeSelect__root");

        fireEvent.mouseDown(screen.getByRole("button"));

        const options = screen.getAllByRole("option");
        const unselectedType = options.find(
            (option) => option.getAttribute("aria-selected") === "false"
        );

        expect(unselectedType).toBeTruthy();

        fireEvent.click(unselectedType!);
        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        expect(typeSelect.querySelector("input")?.value).toBe(
            unselectedType!.getAttribute("data-value")
        );
    });
});
