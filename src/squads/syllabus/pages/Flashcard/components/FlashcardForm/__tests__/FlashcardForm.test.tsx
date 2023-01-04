import { QuizType, QuizItemAttributeConfig } from "src/squads/syllabus/models/quiz";

import FlashcardForm, { FlashcardFormProps, choiceLanguage } from "../FlashcardForm";

import { render } from "@testing-library/react";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());

describe(FlashcardForm.name, () => {
    const defaultValues: FlashcardFormProps["defaultValues"] = {
        externalId: "1",
        definition: "",
        kind: QuizType.QUIZ_TYPE_TAD,
        schoolId: 1,
        quizId: "quiz_id",
        term: "",
        loId: "",
    };

    it("should render form element with prefix", () => {
        const { container } = render(
            <TestHookForm>
                <FlashcardForm defaultValues={defaultValues} keyPath={"flashcard.0."} />z
            </TestHookForm>,
            { wrapper: TestAppWithQueryClient }
        );

        expect(container.querySelector("[name='flashcard.0.term']"));
        expect(container.querySelector("[name='flashcard.0.definition']"));
        expect(container.querySelector("[name='flashcard.0.termLanguage']"));
        expect(container.querySelector("[name='flashcard.0.definitionLanguage']"));
    });

    it("should render form element without prefix", () => {
        const { container } = render(
            <TestHookForm>
                <FlashcardForm defaultValues={defaultValues} />z
            </TestHookForm>,
            { wrapper: TestAppWithQueryClient }
        );

        expect(container.querySelector("[name='term']"));
        expect(container.querySelector("[name='definition']"));
        expect(container.querySelector("[name='termLanguage']"));
        expect(container.querySelector("[name='definitionLanguage']"));
    });
});

describe("test for choiceLanguage options", () => {
    it("should only contains 2 languages are english and japanese", () => {
        const enValue = QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG;
        const jaValue = QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_JP;
        expect(choiceLanguage).toEqual([
            {
                id: enValue,
                label: "en",
                value: `resources.quizzes.choices.flashcardLanguage.${enValue}`,
            },
            {
                id: jaValue,
                label: "ja",
                value: `resources.quizzes.choices.flashcardLanguage.${jaValue}`,
            },
        ]);
    });
});
