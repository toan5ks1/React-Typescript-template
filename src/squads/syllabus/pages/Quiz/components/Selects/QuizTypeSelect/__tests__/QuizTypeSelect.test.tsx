import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { createEmptyLO } from "src/squads/syllabus/test-utils/lo";
import { createEmptyQuizState } from "src/squads/syllabus/test-utils/quiz";

import { QuizType } from "manabie-yasuo/quiz_pb";

import QuizTypeSelect, { QuizTypeSelectProps } from "../QuizTypeSelect";

import { fireEvent, render, screen } from "@testing-library/react";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

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

const checkQuizTypeOptions = (options: QuizType[]) => {
    expect(screen.getAllByRole("option")).toHaveLength(options.length);

    screen.getAllByRole("option").forEach((option, index) => {
        expect(option).toHaveAttribute("data-value", `${options[index]}`);
    });
};

describe(QuizTypeSelect.name, () => {
    Object.keys(KeyLOTypes).forEach((LOType) => {
        it(`should return quiz type are ${
            quizTypeConfigsByLOType[LOType] || quizTypeForOtherLOTypes
        } when LO type is ${LOType}`, () => {
            const props: QuizTypeSelectProps = {
                value: quizTypeConfigsByLOType[LOType]
                    ? QuizType.QUIZ_TYPE_MCQ
                    : QuizType.QUIZ_TYPE_POW,
            };

            const quizReducer = createEmptyQuizState({
                lo: createEmptyLO({ type: LOType as keyof typeof KeyLOTypes }),
            });

            render(
                <TestApp>
                    <AppProvider customStores={{ quiz: quizReducer }}>
                        <QuizTypeSelect {...props} />
                    </AppProvider>
                </TestApp>
            );
            fireEvent.mouseDown(screen.getByRole("button"));

            const listbox = screen.getAllByRole("option");
            if (
                LOType === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO ||
                LOType === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING
            ) {
                expect(listbox).toHaveLength(quizTypeConfigsByLOType[LOType].length);
                return;
            }
            expect(listbox).toHaveLength(quizTypeForOtherLOTypes.length);
            checkQuizTypeOptions(quizTypeForOtherLOTypes);
        });
    });
});
