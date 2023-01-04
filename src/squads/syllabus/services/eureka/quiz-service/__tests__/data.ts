import { mockCreateQuiz } from "src/squads/syllabus/test-utils/quiz";
import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";

import { QuizType } from "manabuf/common/v1/contents_pb";

import NsSyllabus_QuizService from "../types";

export const createMockDataUpsertSingleQuiz: CreateMockDataTest<NsSyllabus_QuizService.UpsertSingleQuiz> =
    () => {
        return {
            quiz: mockCreateQuiz(),
        };
    };
export const createMockDataUpdateDisplayOrderOfQuizSet: CreateMockDataTest<NsSyllabus_QuizService.UpdateDisplayOrderOfQuizSet> =
    (override = {}) => {
        return { loId: "LO_01", pairsList: [{ first: "Q_1", second: "Q_2" }], ...override };
    };

export const createMockDataUpsertQuizV2: CreateMockDataTest<NsSyllabus_QuizService.UpsertQuizV2> = (
    override = {}
) => {
    return { kind: QuizType.QUIZ_TYPE_FIB, quizList: [mockCreateQuiz()], ...override };
};
export const createMockDataRemoveQuizInLO: CreateMockDataTest<NsSyllabus_QuizService.RemoveQuizInLO> =
    (override = {}) => {
        return { loId: "lOId", quizId: "quizId", ...override };
    };
