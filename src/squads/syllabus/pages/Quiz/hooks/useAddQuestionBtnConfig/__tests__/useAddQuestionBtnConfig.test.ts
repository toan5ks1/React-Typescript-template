import { QuizType } from "src/squads/syllabus/models/quiz";

import useAddQuestionBtnConfig, {
    UseAddQuestionBtnConfig,
    UseAddQuestionBtnConfigValue,
} from "../useAddQuestionBtnConfig";

import { renderHook } from "@testing-library/react-hooks";

describe("useAddQuestionBtnConfig", () => {
    it("should hidden with kind is Manual question input", () => {
        const { result } = renderHook<UseAddQuestionBtnConfig, UseAddQuestionBtnConfigValue>(() =>
            useAddQuestionBtnConfig({
                quizType: QuizType.QUIZ_TYPE_MIQ,
                totalAnswer: 1,
            })
        );

        expect(result.current.shouldVisible).toBe(false);
    });

    test.each([QuizType.QUIZ_TYPE_MCQ, QuizType.QUIZ_TYPE_MAQ])(
        "should disable when kind is %i multiple choices || multiple answers have the answer options reach to maximum is 20",
        (quizType: QuizType) => {
            const { result } = renderHook<UseAddQuestionBtnConfig, UseAddQuestionBtnConfigValue>(
                () =>
                    useAddQuestionBtnConfig({
                        quizType,
                        totalAnswer: 20,
                    })
            );

            expect(result.current.shouldVisible).toBe(true);
            // should disable when totalAnswer >= 20
            expect(result.current.disabled).toBe(true);
        }
    );

    it("shouldn't disable when quiz type is fill in the blank", () => {
        const { result } = renderHook<UseAddQuestionBtnConfig, UseAddQuestionBtnConfigValue>(() =>
            useAddQuestionBtnConfig({
                quizType: QuizType.QUIZ_TYPE_FIB,
                totalAnswer: 30,
            })
        );

        expect(result.current.shouldVisible).toBe(true);
        // un-limit totalAnswer with fill in the blank
        expect(result.current.disabled).toBe(false);
    });

    it("shouldn't visible with readOnly mode", () => {
        const { result } = renderHook<UseAddQuestionBtnConfig, UseAddQuestionBtnConfigValue>(() =>
            useAddQuestionBtnConfig({
                quizType: QuizType.QUIZ_TYPE_MCQ,
                readOnly: true,
                totalAnswer: 1,
            })
        );

        expect(result.current.shouldVisible).toBe(false);
        expect(result.current.disabled).toBe(false);
    });
});
