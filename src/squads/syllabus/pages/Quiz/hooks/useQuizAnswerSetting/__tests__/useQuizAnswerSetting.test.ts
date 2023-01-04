import { QuizType } from "src/squads/syllabus/models/quiz";

import useQuizAnswerSetting, {
    UseQuizAnswerSettingProps,
    UseQuizAnswerSettingValue,
} from "../useQuizAnswerSetting";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/models/quiz", () => {
    const actual = jest.requireActual("src/squads/syllabus/models/quiz");
    const { QuizType } = jest.requireActual("src/squads/syllabus/models/quiz");
    return {
        ...actual,
        hasAnswerSetting: (kind: QuizType) => {
            return kind === QuizType.QUIZ_TYPE_MAQ;
        },
    };
});

describe(useQuizAnswerSetting.name, () => {
    it("should return empty array when don't have setting", () => {
        const { result } = renderHook<UseQuizAnswerSettingProps, UseQuizAnswerSettingValue>(() =>
            useQuizAnswerSetting({ kind: QuizType.QUIZ_TYPE_POW })
        );
        expect(result.current.hasSetting).toBe(false);
        expect(result.current.settings).toHaveLength(0);
    });

    it("should return array when have setting", () => {
        const { result } = renderHook<UseQuizAnswerSettingProps, UseQuizAnswerSettingValue>(() =>
            useQuizAnswerSetting({ kind: QuizType.QUIZ_TYPE_MAQ })
        );
        expect(result.current.hasSetting).toBe(true);
        expect(result.current.settings.length).toBeGreaterThanOrEqual(1);
    });
});
