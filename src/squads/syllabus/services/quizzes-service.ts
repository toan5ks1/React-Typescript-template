import {
    QuizzesManyByLearningObjectIdQueryVariables,
    QuizzesOneQueryVariables,
    QuizzesByExternalIdQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";

import quizModifierService from "./eureka/quiz-service/quiz-modifier.mutation";
import NsSyllabus_QuizService from "./eureka/quiz-service/types";
import { quizzesQueriesBob } from "./eureka/quizzes-service-bob";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";
import { NsSyllabus_Yasuo_CoursesService } from "./yasuo/courses-service-yasuo/types";

import coursesYasuoMutation from "src/squads/syllabus/services/yasuo/courses-service-yasuo/courses-yasuo.mutation";

export const quizzesService = defineService({
    query: {
        syllabusQuizGetManyByLOId: (params: QuizzesManyByLearningObjectIdQueryVariables) => {
            if (params.lo_id) return quizzesQueriesBob.getManyByLoId(params);

            return createEmptyResponse(undefined);
        },
        syllabusQuizGetOne: (params: QuizzesOneQueryVariables) => {
            if (params.quiz_id) return quizzesQueriesBob.getOne(params);

            return createEmptyResponse(undefined);
        },
        syllabusQuizGetByExternalId: (params: QuizzesByExternalIdQueryVariables) => {
            return quizzesQueriesBob.getQuizzesByExternalId(params);
        },
    },
    mutation: {
        syllabusQuizUpsert: (payload: NsSyllabus_Yasuo_CoursesService.UpsertQuiz) => {
            return coursesYasuoMutation.upsertQuiz(payload);
        },
        syllabusQuizUpsertSingle: (payload: NsSyllabus_QuizService.UpsertSingleQuiz) => {
            return quizModifierService.upsertSingleQuiz(payload);
        },
        syllabusQuizSwapDisplayOrder: (
            payload: NsSyllabus_QuizService.UpdateDisplayOrderOfQuizSet
        ) => {
            return quizModifierService.updateDisplayOrderOfQuizSet(payload);
        },
        syllabusQuizUpsertV2: (payload: NsSyllabus_QuizService.UpsertQuizV2) => {
            return quizModifierService.upsertQuizV2(payload);
        },
        syllabusQuizDelete: (payload: NsSyllabus_QuizService.RemoveQuizInLO) => {
            return quizModifierService.removeQuizInLO(payload);
        },
    },
});
